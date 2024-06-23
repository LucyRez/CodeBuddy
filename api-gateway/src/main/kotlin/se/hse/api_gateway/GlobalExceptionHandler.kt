package se.hse.api_gateway

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.client.HttpClientErrorException.Unauthorized


@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler
    fun userNotAuthorized(e: IllegalArgumentException): ResponseEntity<AppError> {
        return ResponseEntity<AppError>(AppError(HttpStatus.UNAUTHORIZED.value(), e.message), HttpStatus.UNAUTHORIZED)
    }


}