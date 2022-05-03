package com.rrpvm.backend.exceptions;

public class AuthenticationFailException extends RuntimeException {

    public AuthenticationFailException(String message){
        super(message);
    }
    public AuthenticationFailException(String message,Throwable t){
        super(message,t);
    }
    public AuthenticationFailException(){
        super();
    }
}
