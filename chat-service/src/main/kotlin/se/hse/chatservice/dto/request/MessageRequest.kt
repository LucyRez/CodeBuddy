package se.hse.chatservice.dto.request

data class MessageRequest (
    val chatId: Long,
    val text: String,
    val fromBot: Boolean
)