package se.hse.authorization_service.mail

import org.springframework.data.jpa.repository.JpaRepository

interface ConfirmationCodeRepository: JpaRepository<ConfirmationCode, Long> {
    fun findByCode(code: String): ConfirmationCode?
}