package com.rrpvm.backend.entities;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

public class Banner {
    private Integer id;
    private String name;
    private String textField;
    private Double price;
    List<String> linkedCategories;//names
    private boolean isDeleted;
}
