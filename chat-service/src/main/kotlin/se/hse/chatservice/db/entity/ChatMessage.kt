package se.hse.chatservice.db.entity

import jakarta.persistence.*


@Entity
@Table(name = "messages")
data class ChatMessage(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val text: String,

    @Column(nullable = false)
    val createdAt: String,

    @Column(nullable = false)
    val chatId: Long,

    @Column(nullable = false)
    val fromBot: Boolean = false

)
