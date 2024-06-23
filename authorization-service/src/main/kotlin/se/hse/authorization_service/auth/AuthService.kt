package se.hse.authorization_service.auth


import io.jsonwebtoken.Jwts
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import se.hse.authorization_service.mail.EmailService
import se.hse.authorization_service.user.*

@Service
class AuthService(private val userRepository: AppUserRepository,
                    private val emailService: EmailService,
                  private val jwtUtil: JwtUtil
) {

    fun register(request: RegisterRequest): AuthResponse {
        if (userRepository.existsByEmail(request.email)) {
            return AuthResponse("Email is invalid")
        }
        val user = AppUser(email = request.email, password =  request.password.hashCode().toString())
        val userSaved = userRepository.save(user)

        emailService.send(request.email, jwtUtil.generateToken(user.email), userSaved.id ?: 0)

        return AuthResponse("USER SUCCESSFULLY REGISTERED")
    }

    fun authenticate(request: RegisterRequest): ResponseEntity<AuthResponse> {
        if (!userRepository.existsByEmail(request.email)) {
            return ResponseEntity(AuthResponse("Email not valid"), HttpStatus.UNAUTHORIZED)
        }

        val user = userRepository.findByEmail(request.email)!!

        if (request.password.hashCode().toString() != user.password) {
            return ResponseEntity(AuthResponse("Wrong Password"), HttpStatus.UNAUTHORIZED)
        }

        if (!user.activated) {
            return ResponseEntity(AuthResponse("USER IS NOT ACTIVATED"), HttpStatus.UNAUTHORIZED)
        }

        val token = jwtUtil.generateToken(user.email)

        return ResponseEntity(AuthResponse(token), HttpStatus.OK)
    }

    fun getUserInfo(token: String): ResponseEntity<UserResponse> {

        val user = userRepository.findByEmail(jwtUtil.extractLogin(token))
        return ResponseEntity.ok(UserResponse(user?.id, user?.email ?: "", user?.activated ?: false))
    }

}