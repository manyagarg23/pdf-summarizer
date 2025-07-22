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
    "Analyze the following document and generate a clear, hierarchical Table of Contents (TOC) based on its structure, themes, and logical flow. Use section titles that best represent the content. If the document lacks explicit headings, infer appropriate ones. Maintain coherence and avoid redundancy. Respond only with the Table of Contents. Do not include any additional text or explanations. Do not include \"Table of Contents\" in the response.";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const generateTOC = async (text) => {
  const prompt = await promptTemplate.format({ text });
  const response = await model.invoke(prompt);
  return response.content;
};

module.exports = generateTOC;
