const { OpenAIEmbeddings } = require("@langchain/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const puppeteer = require("puppeteer");
const axios = require("axios");

/**
 * Fetches top Google search result URLs for a given query using SerpAPI.
 * @param {string} query - The search query.
 * @returns {Promise<string[]>} - Array of result URLs.
 */
const getGoogleUrls = async (query) => {
    const params = {
        api_key: process.env.SERPAPI_KEY,
        engine: "google",
        q: query,
        num: 3,
    };
    const response = await axios.get("https://serpapi.com/search", { params });
    return response.data.organic_results.map((r) => r.link);
};

/**
 * Scrapes article content from a list of URLs using Puppeteer.
 * @param {string[]} urls - Array of URLs to scrape.
 * @returns {Promise<Array<{url: string, content: string, metadata: object}>>}
 */
const scrapeArticles = async (urls) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const contents = [];

    for (let url of urls) {
        try {
            await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
            // Extract all paragraph text from the page
            const article = await page.evaluate(() => {
                const content = Array.from(document.querySelectorAll("p"))
                    .map((el) => el.innerText)
                    .join(" ");
                const title = document.querySelector("title")?.innerText || "Recommended Article";
                return { content, title };
            });
            contents.push({ url, content: article, metadata: { source: url } });
        } catch (err) {
            console.warn(`Error scraping ${url}:`, err.message);
        }
    }

    await browser.close();
    return contents;
};

/**
 * Generates recommended articles based on input text.
 * @param {string} text - The input text/query.
 * @returns {Promise<Array<{title: string, summary: string, url: string}>>}
 */
const generateRecs = async (text) => {
    // Split input text into chunks for embedding
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 100,
    });

    // Initialize OpenAI embeddings
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

    // 1. Get Google search result URLs
    const urls = await getGoogleUrls(text);

    // 2. Scrape articles from the URLs
    const articles = await scrapeArticles(urls);

    // 3. Split and embed the scraped articles
    const articleDocs = await splitter.createDocuments(
        articles.map(a => a.content),
        articles.map(a => a.metadata)
    );
    const articleVectorStore = await MemoryVectorStore.fromDocuments(articleDocs, embeddings);

    // 4. Find articles most similar to the input text
    const query = text;
    const results = await articleVectorStore.similaritySearch(query, 2);

    const seenUrls = new Set();
    const output = [];

    // Format the recommendations
    for (const doc of results) {
        const url = doc.metadata?.url || doc.metadata?.source;
        if (!url || seenUrls.has(url)) continue;

        seenUrls.add(url);
        output.push({
            title: doc.metadata?.title || "Recommended Article",
            summary: doc.pageContent.slice(0, 200).trim() + "...",
            url: url,
        });
    }
    console.log(output);
    return output;
};

module.exports = generateRecs;
