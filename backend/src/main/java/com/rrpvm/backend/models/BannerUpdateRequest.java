package com.rrpvm.backend.models;

import java.util.List;

public class BannerUpdateRequest {
    private int id;
    private String name;
    private String textField;
    private double price;
    private boolean deleted;
    private List<CategoryUpdateRequest> linkedCategories;
    public BannerUpdateRequest() {
    }

    public BannerUpdateRequest(int id, String name, String textField, double price, boolean deleted, List<CategoryUpdateRequest> linkedCategories) {
        this.id = id;
        this.name = name;
        this.textField = textField;
        this.price = price;
        this.deleted = deleted;
        this.linkedCategories = linkedCategories;
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

    public String getTextField() {
        return textField;
    }

    public void setTextField(String textField) {
        this.textField = textField;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public List<CategoryUpdateRequest> getLinkedCategories() {
        return linkedCategories;
    }

    public void setLinkedCategories(List<CategoryUpdateRequest> linkedCategories) {
        this.linkedCategories = linkedCategories;
    }


}
