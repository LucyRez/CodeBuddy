package se.hse.api_gateway

import com.google.gson.Gson
import jdk.jfr.ContentType
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import se.hse.api_gateway.requests.MessageRequest
import se.hse.api_gateway.requests.RegisterRequest
import se.hse.api_gateway.responses.AuthResponse
import se.hse.api_gateway.responses.ChatResponse
import se.hse.api_gateway.responses.MessageResponse
import se.hse.api_gateway.responses.UserResponse
import java.lang.IllegalArgumentException

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = arrayOf("http://localhost:3000"))
class GatewayController {
    @Value("\${api.authService}")
    private val authHost: String? = null

    @Value("\${api.chatService}")
    private val chatHost: String? = null

    @Value("\${api.authPort}")
    private val authPort: String? = null

    @Value("\${api.chatPort}")
    private val chatPort: String? = null

    @GetMapping("/chat/get/{userId}")
    fun getChatsByUser(@PathVariable(required = true) userId: Long, @RequestHeader token: String): List<ChatResponse> {

        val auth = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )
        val authResp = Gson().fromJson(auth.text, UserResponse::class.java)

        if (auth.statusCode != 200 || authResp.id != userId || !authResp.activated ) {
            throw IllegalArgumentException("User not authorized")
        }

        val resp = khttp.get(
            url = "$chatHost:$chatPort/api/chat/get/${userId}"
        )

        val parsedResponse = Gson().fromJson(resp.text, Array<ChatResponse>::class.java)

        return parsedResponse.toList()
    }

    @GetMapping("/chat/get/{id}/history")
    fun getChatHistory(@PathVariable(required = true) id: Long, @RequestHeader token: String): List<MessageResponse> {
        val auth = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )
        val authResp = Gson().fromJson(auth.text, UserResponse::class.java)

        if (auth.statusCode != 200 || !authResp.activated ) {
            throw IllegalArgumentException("User not authorized")
        }

        val resp = khttp.get(
            url = "$chatHost:$chatPort/api/chat/get/${id}/history"
        )

        val parsedResponse = Gson().fromJson(resp.text, Array<MessageResponse>::class.java)

        return parsedResponse.toList()

    }

    @DeleteMapping("/chat/delete/{id}")
    fun deleteChat(@PathVariable(required = true) id: Long, @RequestHeader token: String): String {
        val auth = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )
        val authResp = Gson().fromJson(auth.text, UserResponse::class.java)

        if (auth.statusCode != 200 || !authResp.activated ) {
            throw IllegalArgumentException("User not authorized")
        }

        val resp = khttp.delete(
            url = "$chatHost:$chatPort/api/chat/delete/${id}"
        )

        return Gson().fromJson(resp.text, String::class.java)
    }

    @PostMapping("/chat/create/{userId}")
    fun createNewChat(@PathVariable(required = true) userId: Long, @RequestHeader token: String): ChatResponse {
        val auth = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )
        val authResp = Gson().fromJson(auth.text, UserResponse::class.java)

        if (auth.statusCode != 200 || authResp.id != userId || !authResp.activated ) {
            throw IllegalArgumentException("User not authorized")
        }

        val resp = khttp.post(
            url = "$chatHost:$chatPort/api/chat/create/${userId}"
        )

        return Gson().fromJson(resp.text, ChatResponse::class.java)

    }

    @PostMapping("/chat/add")
    fun addMessageToChat(@RequestBody message: MessageRequest, @RequestHeader token: String): MessageResponse {
        val authResp = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )

        if (authResp.statusCode != 200) {
            throw IllegalArgumentException("User not authorized")
        }

        val resp = khttp.post(
            url = "$chatHost:$chatPort/api/chat/add",
            json = mapOf("chatId" to message.chatId, "text" to message.text, "fromBot" to message.fromBot)
        )

        return Gson().fromJson(resp.text, MessageResponse::class.java)
    }

    @PostMapping("/user/register")
    fun register(@RequestBody registrationRequest: RegisterRequest): ResponseEntity<AuthResponse> {
        val authResp = khttp.post(
            url = "$authHost:$authPort/user/register",
            json = mapOf("email" to registrationRequest.email, "password" to registrationRequest.password)
        )

        return ResponseEntity.ok(Gson().fromJson(authResp.text, AuthResponse::class.java) )
    }

    @PostMapping("/user/login")
    fun login(
        @RequestBody request: RegisterRequest
    ): ResponseEntity<AuthResponse> {
        val authResp = khttp.post(
            url = "$authHost:$authPort/user/login",
            json =  mapOf("email" to request.email, "password" to request.password)
        )
        return ResponseEntity.ok(Gson().fromJson(authResp.text, AuthResponse::class.java) )
    }

    @GetMapping("/users")
    fun getUser(@RequestHeader token: String): ResponseEntity<UserResponse> {
        val authResp = khttp.get(
            url = "$authHost:$authPort/user",
            headers = mapOf("token" to token)
        )

        return ResponseEntity.ok(Gson().fromJson(authResp.text, UserResponse::class.java) )
    }

    @GetMapping("/confirm")
    fun confirm(
        @RequestParam code: String
    ): ResponseEntity<String> {
        val authResp = khttp.get(
            url = "$authHost:$authPort/confirm?code=${code}",
        )
        return ResponseEntity.ok(authResp.text )
    }
}