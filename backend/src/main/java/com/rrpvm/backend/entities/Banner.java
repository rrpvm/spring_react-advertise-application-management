package com.rrpvm.backend.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "banners")
public class Banner {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name = "banner_name",unique = true,length = 255)
    @Size(min = 2, max = 255)
    private String name;
    @Column(name = "banner_text")
    private String textField;
    @Column(name = "banner_price")
    private Double price;
    @Column(name = "is_deleted",columnDefinition = "bit default 0")
    private boolean isDeleted;
    @ManyToMany(targetEntity = Category.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   /* @JoinTable(name = "banners_categories",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "categories_id"))*/
    @JoinTable(
            name = "banners_categories",
            joinColumns = {
                    @JoinColumn(name = "banner_id", referencedColumnName = "id", nullable = false, unique = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false, unique = false)
            }
    )
    @JsonIgnore//break infinity loop
    private Set<Category> categories;//names
    public Banner(Long id, String name, String textField, Double price, boolean isDeleted, Set<Category> linkedCategories) {
        this.id = id;
        this.name = name;
        this.textField = textField;
        this.price = price;
        this.isDeleted = isDeleted;
        this.categories = linkedCategories;
    }
    public Banner( String name, String textField, Double price, boolean isDeleted, Set<Category> linkedCategories) {
        this.name = name;
        this.textField = textField;
        this.price = price;
        this.isDeleted = isDeleted;
        this.categories = linkedCategories;
    }
    public Banner() {
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

    public Set<Category> getLinkedCategories() {
        return categories;
    }

    public void setLinkedCategories(Set<Category> linkedCategories) {
        this.categories = linkedCategories;
    }
    @Override
    public String toString(){
        return  String.format("id:%d\nname:%s\ntextField:%s\nprice:%.5f\nisDeleted:%b\n,%s", id, name, textField,price,isDeleted,categories.toString());
    }
}
