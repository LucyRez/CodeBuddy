"use client"

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import Sidebar from "@/components/Sidebar";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

type Props = {
    params: {
        id: number
    }
}

function ChatPage({ params: { id } }: Props) {
  const [msg, setMessages] = useState<MessageResponse[]>([]);

  const fetchMessages = async () => {
    const response = await fetch(`http://localhost:8080/api/chat/get/${id}/history`, {
      method: 'GET', 
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'token': `${window.localStorage.getItem("token")}`
      },
    });
   
    const fetched = await response.json()
    console.log(fetched)
    fetched.sort()
    setMessages(fetched);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMessagesChange = async (newMessage: MessageResponse) => {
    fetchMessages()
  };

  return (
    <div className="flex ">
      <div className="flex-1 bg-[#191c2e] max-w-xs h-[calc(100vh-88px)] overflow-y-scroll md:min-w-[20rem]">
        <Sidebar></Sidebar>
      </div>

      <div className="flex-1 items-center h-[calc(100vh-88px)] justify-center bg-[#282d4a]">
        <div className="flex flex-col h-[calc(100vh-88px)] overflow-hidden ">
          <Chat
            msg={msg}
            chatId={id}
          ></Chat>
          <ChatInput
            msg={msg}
            chatId={id}
            onMessagesChange={handleMessagesChange}
          ></ChatInput>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
