const dotenv = require("dotenv");
dotenv.config();

const { ChatOpenAI } = require("@langchain/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

// 1. Setup model and prompt template
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const systemTemplate =
  "You are a helpful assistant. Answer the following question based only on the provided context.";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "Context: {context}\n\nQuestion: {question}"],
]);

// 2. Answer Question with RAG
const answerQuestion = async (question, text) => {
  // a. Split text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const documents = await splitter.createDocuments([text]);

  // b. Embed and store in memory
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);

  // c. Retrieve relevant chunks
  const retriever = vectorStore.asRetriever();
  const relevantDocs = await retriever.getRelevantDocuments(question);

  const context = relevantDocs.map((doc) => doc.pageContent).join("\n");

  // d. Format and run prompt
  const prompt = await promptTemplate.format({
    context,
    question,
  });

  const response = await model.invoke(prompt);
  return response.content;
};

module.exports = answerQuestion;


// const dotenv = require("dotenv");
// dotenv.config();

// const { ChatOpenAI } = require("@langchain/openai");
// const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
// const { OpenAIEmbeddings } = require("@langchain/openai");
// const { MemoryVectorStore } = require("langchain/vectorstores/memory");
// const { ChatPromptTemplate } = require("@langchain/core/prompts");

// // 1. Setup model and prompt template
// const model = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
//   temperature: 0,
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const systemTemplate =
//   "You are a helpful assistant. Answer the following question based only on the provided context.";

// const promptTemplate = ChatPromptTemplate.fromMessages([
//   ["system", systemTemplate],
//   ["user", "Context: {context}\n\nQuestion: {question}"],
// ]);

// // 2. Answer Question with RAG
// const answerQuestion = async (question, text) => {
//   try {
//     console.log(">>> Step 1: Received question and text");
//     console.log("Question:", question);
//     console.log("Text length:", text.length);

//     // a. Split text into chunks
//     console.log("\n>>> Step 2: Splitting text into chunks");
//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 500,
//       chunkOverlap: 100,
//     });
//     const documents = await splitter.createDocuments([text]);
//     console.log(`Split into ${documents.length} chunks`);

//     // b. Embed and store in memory
//     console.log("\n>>> Step 3: Generating embeddings for chunks");
//     const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
//     const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
//     console.log("Embeddings generated and stored in memory");

//     // c. Retrieve relevant chunks
//     console.log("\n>>> Step 4: Retrieving relevant chunks");
//     const retriever = vectorStore.asRetriever();
//     const relevantDocs = await retriever.getRelevantDocuments(question);
//     console.log(`Retrieved ${relevantDocs.length} relevant document(s)`);

//     const context = relevantDocs.map((doc, idx) => {
//       console.log(`Relevant Doc ${idx + 1}:`, doc.pageContent.slice(0, 100), "...");
//       return doc.pageContent;
//     }).join("\n");

//     // d. Format and run prompt
//     console.log("\n>>> Step 5: Creating final prompt for model");
//     const prompt = await promptTemplate.format({ context, question });
//     console.log("Prompt sent to model:\n", prompt.slice(0, 500), "...");

//     const response = await model.invoke(prompt);
//     console.log("\n>>> Step 6: Received response from model");
//     console.log("Response:", response.content);

//     return response.content;
//   } catch (error) {
//     console.error(">>> Error in answerQuestion function:", error);
//     return "An error occurred while processing the question.";
//   }
// };

// module.exports = answerQuestion;
