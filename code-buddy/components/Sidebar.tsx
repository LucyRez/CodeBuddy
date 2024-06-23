'use client'

import { useEffect, useState } from "react";
import ChatRow from "./ChatRow"
import NewChatBtn from "./NewChatBtn"
import { title } from "process";


function Sidebar() {
  const [chats, setChats] = useState<ChatResponse[]>([]);

  const fetchChats = async () => {

    const response = await fetch(`http://localhost:8080/api/chat/get/${window.localStorage.getItem("userId")}`, {
      method: 'GET', 
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        "token": `${window.localStorage.getItem("token")}`
      },
    
    });

    const fetched = await response.json()
    console.log(fetched)
    fetched.sort()
    setChats(fetched);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleAddChat = async (newChat: ChatResponse) => {
    setChats(oldArray => [...oldArray, newChat]);
  };

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1 ">
            <div>
                <NewChatBtn onAdd={handleAddChat}></NewChatBtn>


                <div>

                </div>

                {chats.map(chat => 
                  <ChatRow key={chat.id} id={`${chat.id}`} title={chat.title} onDelete={fetchChats}></ChatRow>
                )}
                
            </div>

        </div>
    </div>
  )
}

export default Sidebar
