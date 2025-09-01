
import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function startChat(): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
  });
}

export async function sendMessageStream(chat: Chat, message: string) {
    const result = await chat.sendMessageStream({ message });
    return result;
}

export async function generateContentWithImage(prompt: string, image: { base64: string, mimeType: string }): Promise<string> {
  const imagePart: Part = {
    inlineData: {
      data: image.base64,
      mimeType: image.mimeType,
    },
  };
  
  const textPart: Part = {
    text: prompt
  };

  const parts: Part[] = [imagePart, textPart];
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts },
  });

  return response.text;
}
