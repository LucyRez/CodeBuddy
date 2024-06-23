package se.hse.authorization_service.user

import org.springframework.data.jpa.repository.JpaRepository

interface AppUserRepository: JpaRepository<AppUser, Long> {
    fun existsByEmail(email: String): Boolean
    fun findByEmail(email: String): AppUser?
}