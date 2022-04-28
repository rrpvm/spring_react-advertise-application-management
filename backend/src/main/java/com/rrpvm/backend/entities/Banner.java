package com.rrpvm.backend.entities;

import java.util.List;

public class Banner {
    private Integer id;
    private String name;
    private String textField;
    private Double price;
    List<Category> linkedCategories;
    private boolean isDeleted;
}
