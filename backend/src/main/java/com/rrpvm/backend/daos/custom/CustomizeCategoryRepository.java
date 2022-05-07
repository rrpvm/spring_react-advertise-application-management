package com.rrpvm.backend.daos.custom;
import com.rrpvm.backend.entities.Category;

public interface CustomizeCategoryRepository {
   boolean addNewCategory(final Category category);
   boolean isUndependent(Long categoryId);

}
