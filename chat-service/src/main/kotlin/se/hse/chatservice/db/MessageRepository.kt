package se.hse.chatservice.db

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import se.hse.chatservice.db.entity.ChatMessage


@Repository
interface MessageRepository : JpaRepository<ChatMessage, Long> {

    @Query("""
        SELECT m FROM ChatMessage m WHERE m.chatId = :id
    """)
    fun findByChatId(id: Long): List<ChatMessage>?
}

