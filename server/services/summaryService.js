const dotenv = require("dotenv");
dotenv.config();

const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY, 
});

const systemTemplate =
  "Summarize the following text in a concise manner. Focus on what the text says, key points, and logic.";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const summarizeText = async (text) => {
//   console.log("Summarizing code with text:", text);
  const prompt = await promptTemplate.format({ text });
//   console.log("Formatted prompt:", prompt);
  const response = await model.invoke(prompt);
//   console.log("Summary response:", response.content);
  return response.content;
};

module.exports = summarizeText;
