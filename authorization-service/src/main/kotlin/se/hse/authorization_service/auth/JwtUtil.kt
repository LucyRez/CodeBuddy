package se.hse.authorization_service.auth

import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import java.security.Key
import java.util.*

@Component
class JwtUtil {
    @Value("\${jwt.secret}")
    private val secret: String? = null

    @Value("\${jwt.expiration}")
    private val expirationIn: String? = null

    fun generateToken(email: String?): String {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + expirationIn!!.toInt()))
            .signWith(getSignedKey(), io.jsonwebtoken.SignatureAlgorithm.HS256)
            .compact()
    }

    fun extractExpiration(token: String?): Date {
        return Jwts.parser()
            .setSigningKey(getSignedKey())
            .build()
            .parseClaimsJws(token)
            .body
            .expiration

    }

    fun extractLogin(token: String?): String {
        return Jwts.parser()
            .setSigningKey(getSignedKey())
            .build()
            .parseClaimsJws(token)
            .body.subject
    }

    fun validateToken(token: String?): Boolean {
        return try {
            extractExpiration(token).after(Date())
        } catch (e: ExpiredJwtException) {
            false
        }
    }

    private fun getSignedKey(): Key {
        return Keys.hmacShaKeyFor(
            secret!!.toByteArray(StandardCharsets.UTF_8)
        )
    }
}