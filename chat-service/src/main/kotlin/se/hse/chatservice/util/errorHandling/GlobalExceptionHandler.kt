package se.hse.chatservice.util.errorHandling

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler


@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler
    fun catchResourceNotFoundException(e: ResourceNotFoundException): ResponseEntity<AppError> {
        return ResponseEntity<AppError>(AppError(HttpStatus.NOT_FOUND.value(), e.message), HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler
    fun catchIllegalArgumentException(e: IllegalArgumentException): ResponseEntity<AppError> {
        return ResponseEntity<AppError>(AppError(HttpStatus.BAD_REQUEST.value(), e.message), HttpStatus.BAD_REQUEST)
    }
}