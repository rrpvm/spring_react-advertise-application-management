package com.rrpvm.backend.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class empty {

    @GetMapping("/greeting")
    private String greeting(Authentication authentication){

        return Boolean.toString(authentication.isAuthenticated());
    }
    @GetMapping("/")
    private Object base(Authentication authentication){

        return null;
    }
}
