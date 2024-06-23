"use client";

import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

type Props = {
  msg: MessageResponse[],
  chatId: number,
  onMessagesChange: any
};

function ChatInput({ msg, chatId, onMessagesChange }: Props) {
  const [prompt, setPrompt] = useState("");
  const model = "davinci";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();

    const message: Message = {
      chatId: chatId,
      text: input,
      fromBot: false
    };

    const headers = {
      'Content-Type': 'application/json',
      'token': `${window.localStorage.getItem("token")}` 
    }

  var response = await axios.post("http://localhost:8080/api/chat/add", message, {
      headers: headers
  })

    onMessagesChange(response)

    setPrompt("");

    const notification = toast.loading("CodeBuddy is trying his best...");

    const answer = await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
      }),
    }).then((response) => {
        if (response.ok) {
      toast.success("CodeBuddy generated an answer!", {
        id: notification,
      });

      return response.json()
    }
    });

    await axios.post("http://localhost:8080/api/chat/add", answer, {
      headers: headers,
    });

    onMessagesChange(answer)
    console.log(answer)
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          className="bg-transparent flex-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          placeholder="Type your message here..."
        ></input>
        <button
          disabled={!prompt}
          type="submit"
          className={
            "bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          }
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45"></PaperAirplaneIcon>
        </button>
      </form>

      <div></div>
    </div>
  );
}

export default ChatInput;
