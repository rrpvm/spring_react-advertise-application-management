package com.rrpvm.backend.daos.custom;
import com.rrpvm.backend.entities.Category;

public interface CustomizeCategoryRepository {
   boolean addNewCategory(Category category);
   boolean isUndependent(Long categoryId);
}
