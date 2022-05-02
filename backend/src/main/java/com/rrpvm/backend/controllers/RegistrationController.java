package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.UserRepository;
import com.rrpvm.backend.entities.User;
import com.rrpvm.backend.exceptions.UserAlreadyExistException;
import com.rrpvm.backend.models.UserInputData;
import com.rrpvm.backend.models.UserRole;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;


@CrossOrigin("*")
@RestController
public class RegistrationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registration")
    private ResponseEntity<String> registration(@RequestBody @NotNull UserInputData user) throws UserAlreadyExistException {
        final User userFromDb = userRepository.findByLogin(user.getLogin());
        if (userFromDb != null) {
            throw new UserAlreadyExistException();
        }
        userRepository.save(new User(-1,user.getLogin(), passwordEncoder.encode( user.getPassword()), Collections.singleton(UserRole.ADMIN)));
        return ResponseEntity.ok("success");
    }
}
