package se.hse.chatservice.dto.response

data class MessageResponse(
    val id: Long,
    val text: String,
    val createdAt: String,
    val chatId: Long,
    val fromBot: Boolean
)
