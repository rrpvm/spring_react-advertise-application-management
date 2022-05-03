package com.rrpvm.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT, reason="User already exist")  // 409
public class UserAlreadyExistException extends RuntimeException {

}
