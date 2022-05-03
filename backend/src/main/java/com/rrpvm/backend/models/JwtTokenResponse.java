package com.rrpvm.backend.models;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {
    private final String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}

