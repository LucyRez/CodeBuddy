'use client';

import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  title: string;
  onDelete: any;
};

function ChatRow({ id, title, onDelete }: Props) {
  const [active, setActive] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName]);

  const router = useRouter();
  
  const deleteChat = async () => {

    const chatResponse = await fetch( `http://localhost:8080/api/chat/delete/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'token': `${window.localStorage.getItem("token")}`
      },
    });
    

    console.log(chatResponse)
    onDelete()
    router.push(`/playground`);
  };

  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
      <ChatBubbleLeftIcon className="h-5 w-5"></ChatBubbleLeftIcon>
      <p className="flex-1 hidden md:inline-flex truncate">{title}</p>
      <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" onClick={deleteChat}></TrashIcon>
    </Link>
  );
}

export default ChatRow;
