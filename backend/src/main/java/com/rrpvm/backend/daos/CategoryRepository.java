package com.rrpvm.backend.daos;

import com.rrpvm.backend.daos.custom.CustomizeCategoryRepository;
import com.rrpvm.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long>, CustomizeCategoryRepository {
    Category findCategoryByName(String name);

    Category findCategoryByRequestId(String requestId);

    List<Category> findAllByDeleted(boolean isDeleted);
}
