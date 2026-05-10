import { GoogleGenerativeAI } from "@google/generative-ai";

// Инициализация (лучше вынести в отдельный сервис/конфиг)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askAI(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) throw new Error("ИИ вернул пустой ответ");
    
    return text;
  } catch (error) {
    console.error("Ошибка Gemini API:", error);
    return "Извините, не удалось получить ответ от ИИ.";
  }
}