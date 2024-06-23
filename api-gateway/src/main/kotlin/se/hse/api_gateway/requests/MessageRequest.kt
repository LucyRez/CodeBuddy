package se.hse.api_gateway.requests

data class MessageRequest (
    val chatId: Long,
    val text: String,
    val fromBot: Boolean
)