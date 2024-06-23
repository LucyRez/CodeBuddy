package se.hse.authorization_service.mail

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import se.hse.authorization_service.auth.AuthResponse
import se.hse.authorization_service.user.AppUserRepository
import se.hse.authorization_service.user.RegisterRequest

@RestController
@RequestMapping("/confirm")
class ConfirmationController (private val confirmationCodeRepository: ConfirmationCodeRepository,
    private val userRepository: AppUserRepository) {

    @GetMapping
    fun confirm(
        @RequestParam code: String
    ): ResponseEntity<String> {

        val confirmationCode = confirmationCodeRepository.findByCode(code)
        if (confirmationCode != null) {
            val user = userRepository.findById(confirmationCode.userId)
            if (!user.isEmpty) {
                user.get().activated = true
                userRepository.save(user.get())
                return ResponseEntity(HttpStatus.OK)
            }
        }
        return ResponseEntity("Could not confirm", HttpStatus.BAD_REQUEST)
    }
}