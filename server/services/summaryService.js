const dotenv = require("dotenv");
dotenv.config();

const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Prompts
const mapPromptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "Summarize the following text in a concise manner. Focus on what the text says, key points, and logic."],
  ["user", "{text}"],
]);

const reducePromptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "Combine the following summaries into a single, coherent summary. Focus on key themes and avoid repetition."],
  ["user", "{text}"],
]);

// Map function: summarize one chunk
const summarizeChunk = async (text) => {
  const prompt = await mapPromptTemplate.format({ text });
  const response = await model.invoke(prompt);
  return response.content;
};

// Reduce function: summarize all summaries
const reduceSummaries = async (summaries) => {
  const combined = summaries.join("\n");
  const prompt = await reducePromptTemplate.format({ text: combined });
  const response = await model.invoke(prompt);
  return response.content;
};

// Main summarization function
const summarizeLargeText = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.createDocuments([text]);
  const mappedSummaries = [];

  for (const chunk of chunks) {
    const summary = await summarizeChunk(chunk.pageContent);
    mappedSummaries.push(summary);
  }

  const finalSummary = await reduceSummaries(mappedSummaries);
  return finalSummary;
};

module.exports = summarizeLargeText;


///////////////////////Normal llm prompt for summarization///////////////////////
// const dotenv = require("dotenv");
// dotenv.config();

// const { ChatOpenAI } = require("@langchain/openai");
// const { ChatPromptTemplate } = require("@langchain/core/prompts");

// const model = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
//   temperature: 0,
//   openAIApiKey: process.env.OPENAI_API_KEY, 
// });

// const systemTemplate =
//   "Summarize the following text in a concise manner. Focus on what the text says, key points, and logic.";

// const promptTemplate = ChatPromptTemplate.fromMessages([
//   ["system", systemTemplate],
//   ["user", "{text}"],
// ]);

// const summarizeText = async (text) => {
// //   console.log("Summarizing code with text:", text);
//   const prompt = await promptTemplate.format({ text });
// //   console.log("Formatted prompt:", prompt);
//   const response = await model.invoke(prompt);
// //   console.log("Summary response:", response.content);
//   return response.content;
// };

// module.exports = summarizeText;
