import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Context } from "hono";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || "")

export const getRandom = async (c: Context)=>{
    const model = ai.getGenerativeModel({model: "gemini-1.5-flash"})

    const promt ="Придумай случайную интересную тему для поиска книги в Google Books API на английском (2-3 слова). Верни только эти слова."
    const result = await model.generateContent(promt)
    const aiQuery = result.response.text().trim();

    const bookResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(aiQuery)}&maxResults=1`)
    const bookData = await bookResponse.json();

    return c.json({
        book: bookData.items[0],
        aiComment: `ИИ выбрал тему "${aiQuery}", потому что она кажется ему вдохновляющей.`
  });
}