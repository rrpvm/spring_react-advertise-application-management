package com.rrpvm.backend.daos;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TransactionRequiredException;

public class CustomizeBannerRepositoryImpl implements CustomizeBannerRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public boolean deleteBannerById(Long id) {
        Query query = em.createQuery("UPDATE Banner set isDeleted = :deleteParam where id = :idParam");
        try {
            query.setParameter("idParam", id);
            query.setParameter("deleteParam", true);
            int result = query.executeUpdate();
            System.out.println(result);
        } catch (TransactionRequiredException exception) {
            System.out.println(exception.getMessage());
        }
        return true;
    }
}
