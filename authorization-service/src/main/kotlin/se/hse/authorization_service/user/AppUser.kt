package se.hse.authorization_service.user

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "app_users")
data class AppUser(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(nullable = false)
    val email: String,

    @Column(nullable = false)
    val password: String,

    @Column(nullable = false)
    var activated: Boolean = false

)

