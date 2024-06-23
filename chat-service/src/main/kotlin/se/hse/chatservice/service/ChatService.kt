package se.hse.chatservice.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import se.hse.chatservice.db.ChatRepository
import se.hse.chatservice.db.MessageRepository
import se.hse.chatservice.db.entity.Chat
import se.hse.chatservice.db.entity.ChatMessage
import se.hse.chatservice.dto.request.MessageRequest
import se.hse.chatservice.dto.response.ChatResponse
import se.hse.chatservice.dto.response.MessageResponse
import se.hse.chatservice.util.errorHandling.ResourceNotFoundException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*


@Service
class ChatService(private val chatRepository: ChatRepository, private val messageRepository: MessageRepository) {

    fun returnAllUserChats(userId: Long): List<ChatResponse> {
        return chatRepository.findAllByUserId(userId)
            ?.map {
                it.id?.let { it1 -> ChatResponse(it1, it.title, it.createdAt) }
                    ?: throw IllegalArgumentException("Somehow one of the chats did not have an id")
            } ?: mutableListOf()
    }

    fun returnChatHistory(chatId: Long): List<MessageResponse> {
        return messageRepository.findByChatId(chatId)
            ?.map {
                it.id?.let { it1 -> MessageResponse(it1, it.text, it.createdAt, it.chatId, it.fromBot) }
                    ?: throw IllegalArgumentException("Somehow one of the messages did not have an id")
            } ?: mutableListOf()
    }

    fun deleteChat(chatId: Long): String {
        val chat = chatRepository.findById(chatId)
            .orElseThrow { ResourceNotFoundException("Chat with id $chatId does not exist") }
        chatRepository.delete(chat)
        return "SUCCESS"
    }

    fun createNew(userId: Long): ChatResponse {
        val time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"))
        val newChat = Chat(title = "Empty chat", createdAt = time, userId = userId)
        val saved = chatRepository.save(newChat)
        return saved.id?.let { ChatResponse(it, saved.title, saved.createdAt) }
            ?: throw IllegalArgumentException("Somehow the created chat did not have an id")
    }

    fun addMessage(messageRequest: MessageRequest): MessageResponse {
        val time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"))
        val message = ChatMessage(
            text = messageRequest.text,
            createdAt = time,
            chatId = messageRequest.chatId,
            fromBot = messageRequest.fromBot
        )
        val savedMessage = messageRepository.save(message)
        return savedMessage.id?.let {
            MessageResponse(
                id = it,
                text = savedMessage.text,
                createdAt = savedMessage.createdAt,
                chatId = savedMessage.chatId,
                fromBot = savedMessage.fromBot
            )
        } ?: throw IllegalArgumentException("Somehow the sent message did not have an id")
    }
}

