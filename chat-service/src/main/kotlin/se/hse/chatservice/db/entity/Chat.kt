package se.hse.chatservice.db.entity

import jakarta.persistence.*

@Entity
class Chat (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val createdAt: String,

    @Column(nullable = false)
    val userId: Long,
)