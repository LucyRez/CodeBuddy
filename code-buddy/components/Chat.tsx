"use client";

import { text } from "stream/consumers";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";


type Props = {
  msg: MessageResponse[],
  chatId: number,
};

function Chat({ msg, chatId}: Props) {

  return <div className="overflow-auto h-[calc(100vh-88px)] scroll-snap-y-container">
    {msg?.length == 0 && (
      <>
        <p className="mt-10 text-center text-white">
          Ask CodeBuddy a question to get started!
        </p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce"></ArrowDownCircleIcon>
      </>
    ) }
    {msg?.map((message) => (
       <Message key={message.id} message={message}></Message>
    ))}
   

  </div>;
}

export default Chat;
