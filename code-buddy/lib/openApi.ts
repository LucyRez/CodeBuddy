import {OpenAI} from "openai";

const openai = new OpenAI({
    baseURL: "http://localhost:1234/v1",
    apiKey: "lm-studio"
})

export default openai;
