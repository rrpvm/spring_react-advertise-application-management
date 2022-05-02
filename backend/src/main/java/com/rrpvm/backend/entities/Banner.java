package com.rrpvm.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "banners")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "banner_name")
    private String name;
    @Column(name = "banner_text")
    private String textField;
    @Column(name = "banner_price")
    private Double price;
    @Column(name = "is_deleted")
    private boolean isDeleted;
    @OneToMany(targetEntity = Category.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Category> linkedCategories;//names

    public Banner(Integer id, String name, String textField, Double price, boolean isDeleted, List<Category> linkedCategories) {
        this.id = id;
        this.name = name;
        this.textField = textField;
        this.price = price;
        this.isDeleted = isDeleted;
        this.linkedCategories = linkedCategories;
    }

    public Banner() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public List<Category> getLinkedCategories() {
        return linkedCategories;
    }

    public void setLinkedCategories(List<Category> linkedCategories) {
        this.linkedCategories = linkedCategories;
    }
}
