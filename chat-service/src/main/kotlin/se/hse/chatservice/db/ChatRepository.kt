package se.hse.chatservice.db

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import se.hse.chatservice.db.entity.Chat

@Repository
interface ChatRepository: JpaRepository<Chat, Long> {

    @Query("""
        SELECT c FROM Chat c WHERE c.userId = :id
    """)
    fun findAllByUserId(id: Long): List<Chat>?
}