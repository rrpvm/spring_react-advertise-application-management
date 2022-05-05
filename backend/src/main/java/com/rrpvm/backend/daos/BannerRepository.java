package com.rrpvm.backend.daos;

import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;


public interface BannerRepository extends JpaRepository<Banner,Long> , CustomizeBannerRepository{
    Banner findBannerByName(String name);
    List<Banner> findAllByIsDeleted(boolean deleted);
}
