import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API}` });
const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API}`);
const model_id = "gemini-2.0-flash";
const model = genAI.getGenerativeModel({ model: model_id });

export { ai, model, model_id };
