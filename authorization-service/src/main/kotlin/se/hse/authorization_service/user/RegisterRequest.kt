package se.hse.authorization_service.user

data class RegisterRequest(
    val email: String,
    val password: String,
)
