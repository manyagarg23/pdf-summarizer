// const { OpenAIEmbeddings } = require("@langchain/openai");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");
// const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
// const puppeteer = require("puppeteer");
// const axios = require("axios");

// /**
//  * Fetches top Google search result URLs for a given query using SerpAPI.
//  * @param {string} query - The search query.
//  * @returns {Promise<string[]>} - Array of result URLs.
//  */
// const getGoogleUrls = async (query) => {
//   const params = {
//     api_key: process.env.SERPAPI_KEY,
//     engine: "google",
//     q: query,
//     num: 3,
//   };

//   try {
//     const response = await axios.get("https://serpapi.com/search", { params });

//     if (!response.data || !Array.isArray(response.data.organic_results)) {
//       console.error("⚠️ Invalid response from SerpAPI:", response.data);
//       return [];
//     }

//     return response.data.organic_results.map((r) => r.link);
//   } catch (err) {
//     console.error("❌ Failed to fetch Google results:", err.message);
//     return [];
//   }
// };

// /**
//  * Scrapes article content from a list of URLs using Puppeteer.
//  * @param {string[]} urls - Array of URLs to scrape.
//  * @returns {Promise<Array<{url: string, content: string, metadata: object}>>}
//  */
// const scrapeArticles = async (urls) => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     const contents = [];

//     for (let url of urls) {
//         try {
//             await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
//             // Extract all paragraph text from the page
//             const article = await page.evaluate(() => {
//     let content = Array.from(document.querySelectorAll("p"))
//       .map((el) => el.innerText)
//       .join(" ");

//     // Fallback if content is empty
//     if (!content || content.trim().length < 50) {
//       content = document.body.innerText;
//     }

//     const title = document.querySelector("title")?.innerText || "Recommended Article";
//     return { content, title };
// });
//             contents.push({ url, content: article, metadata: { source: url } });
//         } catch (err) {
//             console.warn(`Error scraping ${url}:`, err.message);
//         }
//     }

//     await browser.close();
//     return contents;
// };

// /**
//  * Generates recommended articles based on input text.
//  * @param {string} text - The input text/query.
//  * @returns {Promise<Array<{title: string, summary: string, url: string}>>}
//  */
// const generateRecs = async (text) => {
//     // Split input text into chunks for embedding
//     const splitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 500,
//         chunkOverlap: 100,
//     });

//     // Initialize OpenAI embeddings
//     const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

//     // 1. Get Google search result URLs
//     const urls = await getGoogleUrls(text);

//     // 2. Scrape articles from the URLs
//     const articles = await scrapeArticles(urls);

//     // 3. Filter out articles with empty content and ensure content is string
//     const validArticles = articles.filter(article => 
//         article.content && 
//         typeof article.content === 'string' && 
//         article.content.trim().length > 0
//     );

//     if (validArticles.length === 0) {
//         console.warn("No valid articles found to process");
//         return [];
//     }

//     // 4. Split and embed the scraped articles
//     const articleDocs = await splitter.createDocuments(
//         validArticles.map(a => a.content), // Now guaranteed to be strings
//         validArticles.map(a => ({ 
//             ...a.metadata, 
//             url: a.url, 
//             title: a.title 
//         }))
//     );
    
//     const articleVectorStore = await MemoryVectorStore.fromDocuments(articleDocs, embeddings);

//     // 5. Find articles most similar to the input text
//     const query = text;
//     const results = await articleVectorStore.similaritySearch(query, 2);

//     const seenUrls = new Set();
//     const output = [];

//     // Format the recommendations
//     for (const doc of results) {
//         const url = doc.metadata?.url || doc.metadata?.source;
//         if (!url || seenUrls.has(url)) continue;

//         seenUrls.add(url);
//         output.push({
//             title: doc.metadata?.title || "Recommended Article",
//             summary: doc.pageContent.slice(0, 200).trim() + "...",
//             url: url,
//         });
//     }
    
//     console.log(output);
//     return output;
// };

// module.exports = generateRecs;

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

  try {
    console.log(`🔍 Searching for: "${query}"`);
    const response = await axios.get("https://serpapi.com/search", { params });

    if (!response.data || !Array.isArray(response.data.organic_results)) {
      console.error("⚠️ Invalid response from SerpAPI:", response.data);
      return [];
    }

    const urls = response.data.organic_results.map((r) => r.link);
    console.log(`✅ Found ${urls.length} URLs:`, urls);
    return urls;
  } catch (err) {
    console.error("❌ Failed to fetch Google results:", err.message);
    return [];
  }
};

/**
 * Scrapes article content from a list of URLs using Puppeteer.
 * @param {string[]} urls - Array of URLs to scrape.
 * @returns {Promise<Array<{url: string, content: string, title: string, metadata: object}>>}
 */
const scrapeArticles = async (urls) => {
    console.log(`🕷️ Starting to scrape ${urls.length} URLs...`);
    
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Add these for better compatibility
    });
    const page = await browser.newPage();
    
    // Set user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    const contents = [];

    for (let url of urls) {
        try {
            console.log(`📄 Scraping: ${url}`);
            
            await page.goto(url, { 
                waitUntil: "domcontentloaded", 
                timeout: 20000 // Increased timeout
            });
            
            // Wait a bit for dynamic content to load
           const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            await delay(2000);
            
            // Extract article content with multiple fallback strategies
            const article = await page.evaluate(() => {
                let content = "";
                
                // Strategy 1: Common article selectors
                const articleSelectors = [
                    'article',
                    '[role="main"]',
                    '.content',
                    '.article-content',
                    '.post-content',
                    '.entry-content',
                    'main'
                ];
                
                for (const selector of articleSelectors) {
                    const element = document.querySelector(selector);
                    if (element) {
                        content = element.innerText;
                        if (content && content.trim().length > 100) {
                            break;
                        }
                    }
                }
                
                // Strategy 2: All paragraphs if article selectors failed
                if (!content || content.trim().length < 100) {
                    content = Array.from(document.querySelectorAll("p"))
                        .map((el) => el.innerText)
                        .join(" ");
                }
                
                // Strategy 3: Body text as last resort
                if (!content || content.trim().length < 50) {
                    content = document.body.innerText;
                }
                
                // Clean up content
                content = content
                    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                    .replace(/\n+/g, ' ') // Replace newlines with spaces
                    .trim();
                
                const title = document.querySelector("title")?.innerText || 
                            document.querySelector("h1")?.innerText || 
                            "Recommended Article";
                
                return { content, title };
            });
            
            console.log(`📊 Scraped "${article.title}" - Content length: ${article.content.length} chars`);
            
            // Only add if we have meaningful content
            if (article.content && article.content.trim().length > 50) {
                contents.push({ 
                    url, 
                    content: article.content, 
                    title: article.title,
                    metadata: { source: url, title: article.title } 
                });
            } else {
                console.warn(`⚠️ Skipping ${url} - insufficient content (${article.content.length} chars)`);
            }
            
        } catch (err) {
            console.warn(`❌ Error scraping ${url}:`, err.message);
        }
    }

    await browser.close();
    console.log(`✅ Successfully scraped ${contents.length} articles`);
    return contents;
};

/**
 * Generates recommended articles based on input text.
 * @param {string} text - The input text/query.
 * @returns {Promise<Array<{title: string, summary: string, url: string}>>}
 */
const generateRecs = async (text) => {
    console.log(`🚀 Starting recommendation generation for: "${text}"`);
    
    try {
        // Validate input
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            throw new Error("Invalid input text provided");
        }
        
        // Check environment variables
        if (!process.env.SERPAPI_KEY) {
            throw new Error("SERPAPI_KEY not found in environment variables");
        }
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY not found in environment variables");
        }
        
        // Split input text into chunks for embedding
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
        });

        // Initialize OpenAI embeddings
        const embeddings = new OpenAIEmbeddings({ 
            openAIApiKey: process.env.OPENAI_API_KEY 
        });

        // 1. Get Google search result URLs
        const urls = await getGoogleUrls(text);
        
        if (urls.length === 0) {
            console.error("❌ No URLs found from search");
            return [];
        }

        // 2. Scrape articles from the URLs
        const articles = await scrapeArticles(urls);
        
        if (articles.length === 0) {
            console.error("❌ No articles successfully scraped");
            return [];
        }

        // 3. Filter and validate articles
        const validArticles = articles.filter((article, index) => {
            const isValid = article.content && 
                           typeof article.content === 'string' && 
                           article.content.trim().length > 100; // Increased minimum length
            
            if (!isValid) {
                console.warn(`⚠️ Article ${index + 1} filtered out - Content: "${article.content?.substring(0, 50)}..."`);
            }
            
            return isValid;
        });

        console.log(`📋 Valid articles after filtering: ${validArticles.length}`);

        if (validArticles.length === 0) {
            console.error("❌ No valid articles found after filtering");
            return [];
        }

        // 4. Split and embed the scraped articles
        console.log("🔧 Creating document embeddings...");
        
        const articleDocs = await splitter.createDocuments(
            validArticles.map(a => a.content),
            validArticles.map(a => ({ 
                ...a.metadata, 
                url: a.url, 
                title: a.title 
            }))
        );
        
        console.log(`📄 Created ${articleDocs.length} document chunks`);
        
        const articleVectorStore = await MemoryVectorStore.fromDocuments(articleDocs, embeddings);

        // 5. Find articles most similar to the input text
        console.log("🔍 Searching for similar content...");
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
        
        console.log(`✅ Generated ${output.length} recommendations`);
        console.log(output);
        return output;
        
    } catch (error) {
        console.error("❌ Error in generateRecs:", error.message);
        console.error("Stack trace:", error.stack);
        return [];
    }
};

module.exports = generateRecs;