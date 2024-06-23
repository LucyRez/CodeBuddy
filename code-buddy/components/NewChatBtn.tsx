"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  onAdd: any;
};

function NewChatBtn({ onAdd }: Props) {
  const router = useRouter();
  const createNewChat = async () => {

    const headers = {
      'mode': 'cors',
      'Content-Type': 'application/json',
      'token': `${window.localStorage.getItem("token")}`
    }

    const chatResponse = await axios.post(
      "http://localhost:8080/api/chat/create/2", {}, {
      
        headers: headers}
      
    );

    console.log(chatResponse);
    onAdd({
      id: chatResponse.data.id,
      title: chatResponse.data.title,
      createdAt: chatResponse.data.createdAt,
    });
    router.push(`/chat/${chatResponse.data.id}`);
  };

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4"></PlusIcon>
      <p>New Chat</p>
    </div>
  );
}

export default NewChatBtn;
