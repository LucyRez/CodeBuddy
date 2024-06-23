package se.hse.api_gateway.responses

data class UserResponse(
    var id: Long? = null,

    val email: String,

    var activated: Boolean = false
)
