package com.rrpvm.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

/*
1. выбор имени и айди запроса по айди банера
select categories.request_id, categories.name from  categories join banners_categories bc on categories.id = bc.categories_id where banner_id = ?
* */
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", unique = true, length = 255)
    @Size(min = 2, max = 255)
    private String name;
    @Column(name = "request_id", unique = true, length = 255)
    @Size(min = 2, max = 255)
    private String requestId;

    @Column(name = "is_deleted", columnDefinition = "bit default 0")
    private boolean deleted;


    @ManyToMany(targetEntity = Banner.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore////break infinity loop
    private List<Banner> banner;

    public Category() {
    }

    public Category(Long id, String name, String requestId, boolean isDeleted, List<Banner> banner) {
        this.id = id;
        this.name = name;
        this.requestId = requestId;
        this.banner = banner;
        this.deleted = isDeleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public List<Banner> getBanner() {
        return banner;
    }

    public void setBanner(List<Banner> banner) {
        this.banner = banner;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
