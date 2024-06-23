package se.hse.api_gateway.requests

data class RegisterRequest(
    val email: String,
    val password: String,
)
