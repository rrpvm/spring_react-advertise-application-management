package com.rrpvm.backend.daos.custom.implementation;

import com.rrpvm.backend.daos.custom.CustomizeBannerRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TransactionRequiredException;

public class CustomizeBannerRepositoryImpl implements CustomizeBannerRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public boolean deleteBannerById(Long id) {
        Query query = entityManager.createQuery("UPDATE Banner set isDeleted = :deleteParam where id = :idParam");
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

    @Override
    @Transactional
    public void addNewBanner(Banner ref) {
        boolean result = false;
        Query query = entityManager.createNativeQuery("insert into banners(banner_text,banner_name,banner_price,is_deleted) values (?1, ?2, ?3, ?4)");
        query.setParameter(1, ref.getTextField());
        query.setParameter(2, ref.getName());
        query.setParameter(3, ref.getPrice());
        query.setParameter(4, ref.isDeleted());
        try {
            int resultCode = query.executeUpdate();
            if (resultCode == 1) {
                long addedBannerId = (Long) entityManager.createQuery("select id from Banner where name = ?1").setParameter(1, ref.getName()).getSingleResult();
                for (Category category : ref.getLinkedCategories()) {
                    Query linkCategoriesQuery = entityManager.createNativeQuery("insert into banners_categories(id,categories_id) values (?1,?2)");
                    linkCategoriesQuery.setParameter(1, addedBannerId);
                    linkCategoriesQuery.setParameter(2, category.getId());
                    int linkedQueryResult = linkCategoriesQuery.executeUpdate();
                    if (linkedQueryResult != 1) throw new Exception();//can be deleted
                    else result = true;
                }
            }
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
    }
}
