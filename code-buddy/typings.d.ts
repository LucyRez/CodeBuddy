interface Message {
    text: string,
    chatId: number,
    fromBot: boolean
} 

interface ChatResponse {
    id: number,
    title: string,
    createdAt: string
}

interface MessageResponse {
    id: number,
    text: string,
    createdAt: string,
    chatId: number,
    fromBot: boolean
} 