package com.rrpvm.backend.models;

import com.rrpvm.backend.entities.Banner;

public class CategoryUpdateRequest {
    private int id;
    private String name;
    private String requestId;

    public CategoryUpdateRequest() {

    }

    public CategoryUpdateRequest(int id, String name, String requestId) {
        this.id = id;
        this.name = name;
        this.requestId = requestId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

}
