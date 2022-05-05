package com.rrpvm.backend.daos;

import com.rrpvm.backend.daos.custom.CustomizeBannerRepository;
import com.rrpvm.backend.entities.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BannerRepository extends JpaRepository<Banner, Long>, CustomizeBannerRepository {
    Banner findBannerByName(String name);


    List<Banner> findAllByIsDeleted(boolean deleted);
}
