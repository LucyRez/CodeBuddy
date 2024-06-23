package se.hse.api_gateway.responses

data class MessageResponse(
    val id: Long,
    val text: String,
    val createdAt: String,
    val chatId: Long,
    val fromBot: Boolean
)
