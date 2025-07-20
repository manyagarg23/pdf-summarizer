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
  "You are a helpful assistant. Answer the following question based only on the provided text.";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "Text: {text}\n\nQuestion: {question}"],
]);

const answerQuestion = async (question, text) => {
  const prompt = await promptTemplate.format({ question, text });
  const response = await model.invoke(prompt);
  return response.content;
};

module.exports = answerQuestion;
