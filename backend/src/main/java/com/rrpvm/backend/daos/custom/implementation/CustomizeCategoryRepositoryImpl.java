package com.rrpvm.backend.daos.custom.implementation;

import com.rrpvm.backend.daos.custom.CustomizeCategoryRepository;
import com.rrpvm.backend.entities.Category;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class CustomizeCategoryRepositoryImpl implements CustomizeCategoryRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public boolean addNewCategory(Category category) {
        int result = 0;
        try {
            Query query = entityManager.createNativeQuery("insert into categories (name, request_id) VALUES (?1,?2)");
            query.setParameter(1, category.getName());
            query.setParameter(2, category.getRequestId());
            result = query.executeUpdate();
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
        return result == 1;
    }

    @Transactional
    @Override
    public boolean isUndependent(Long categoryId) {
        boolean result = true;
        Query query = entityManager.createNativeQuery("select banners_categories.id from banners_categories where categories_id = ?1");
        query.setParameter(1, categoryId);
        List<Long> bannersConnectedIds = query.getResultList();
        return bannersConnectedIds.isEmpty();
    }
}
