package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.UserRepository;
import com.rrpvm.backend.entities.User;
import com.rrpvm.backend.exceptions.AuthenticationFailException;
import com.rrpvm.backend.exceptions.UserAlreadyExistException;
import com.rrpvm.backend.jwt.JwtTokenUtil;
import com.rrpvm.backend.models.AdminLoginRequest;
import com.rrpvm.backend.models.JwtTokenResponse;
import com.rrpvm.backend.services.JdbcUserDetailsService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@CrossOrigin("*")
@RestController
public class AuthorizationController {
    @Value("${jwt.http.request.header}")
    private String tokenHeader;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JdbcUserDetailsService jdbcUserDetailsService;//UserDetailsService
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "${jwt.get.token.uri}")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AdminLoginRequest authenticationRequest) throws AuthenticationException/* do login*/ {
        this.doAuthenticate(authenticationRequest.getLogin(), authenticationRequest.getPassword());
        final UserDetails userDetails = jdbcUserDetailsService.loadUserByUsername(authenticationRequest.getLogin());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }

    @GetMapping(value = "${jwt.refresh.token.uri}")
    public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    private void doAuthenticate(@NotNull String username, @NotNull String password) throws RuntimeException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationFailException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationFailException("INVALID_CREDENTIALS", e);
        }
    }

    @ExceptionHandler({AuthenticationFailException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
}
