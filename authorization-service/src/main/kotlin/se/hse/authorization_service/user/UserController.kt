package se.hse.authorization_service.user

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import se.hse.authorization_service.auth.AuthResponse
import se.hse.authorization_service.auth.AuthService
import se.hse.authorization_service.auth.JwtUtil

@RestController
@RequestMapping("/user")
class UserController(val authService: AuthService, val jwtUtil: JwtUtil) {
    @PostMapping("/register")
    fun register(@RequestBody registrationRequest: RegisterRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.ok(authService.register(registrationRequest))
    }

    @PostMapping("/login")
    fun login(
        @RequestBody request: RegisterRequest
    ): ResponseEntity<AuthResponse> {
        return authService.authenticate(request)
    }

    @GetMapping
    fun getUser(@RequestHeader token: String): ResponseEntity<UserResponse> {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity(
                null,
                HttpStatus.UNAUTHORIZED
            )
        }

        return authService.getUserInfo(token)

    }
}