import { LMStudioClient } from "@lmstudio/sdk";
import openai from "./openApi";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.completions.create({model: "model", prompt: prompt, temperature: 0.9, max_tokens: 1000, top_p: 1, frequency_penalty: 0, presence_penalty: 0})
    .then(res => res.choices[0].text).catch(err=> `The LM was not able to generate answer for that. Sory :( Error message: ${err.message})`)

    return res;


    
}

export default query;