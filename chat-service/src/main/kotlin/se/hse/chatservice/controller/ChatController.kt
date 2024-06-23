package se.hse.chatservice.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import se.hse.chatservice.dto.request.MessageRequest
import se.hse.chatservice.dto.response.ChatResponse
import se.hse.chatservice.dto.response.MessageResponse
import se.hse.chatservice.service.ChatService


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = ["*"])
class ChatController(private val chatService: ChatService) {

    @GetMapping("/get/{userId}")
    fun getChatsByUser(@PathVariable(required = true) userId: Long): List<ChatResponse> {
        return chatService.returnAllUserChats(userId)
    }

    @GetMapping("/get/{id}/history")
    fun getChatHistory(@PathVariable(required = true) id: Long): List<MessageResponse> {
        return chatService.returnChatHistory(id)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteChat(@PathVariable(required = true) id: Long): String {
        return chatService.deleteChat(id)
    }

    @PostMapping("/create/{userId}")
    fun createNewChat(@PathVariable(required = true) userId: Long): ChatResponse {
        return chatService.createNew(userId)
    }

    @PostMapping("/add")
    fun addMessageToChat(@RequestBody message: MessageRequest): MessageResponse {
        return chatService.addMessage(message)
    }
}

