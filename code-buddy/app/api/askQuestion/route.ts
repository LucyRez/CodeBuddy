import query from "@/lib/queryApi";
import axios from "axios";

type Data = {
  answer: string;
};

export async function POST(req: Request) {
  const { prompt, chatId, model } = await req.json();

  if (!prompt) {
    return new Response("There was no prompt!", { status: 400 });
  }

  if (!chatId) {
    return new Response("ChatId was invalid!", { status: 400 });
  }

  const response = await query(prompt, chatId, model);
  const message: Message = {
    chatId: chatId,
    text:
      response || `The LM was not able to generate answer for that. Sory :(`,
    fromBot: true,
  };

  return Response.json(message);
}
