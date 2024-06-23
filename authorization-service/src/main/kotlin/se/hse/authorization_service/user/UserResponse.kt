package se.hse.authorization_service.user

data class UserResponse(
    var id: Long? = null,

    val email: String,

    var activated: Boolean = false
)
