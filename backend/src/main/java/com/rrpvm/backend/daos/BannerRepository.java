package com.rrpvm.backend.daos;

import com.rrpvm.backend.entities.Banner;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BannerRepository extends JpaRepository<Banner,Integer> {

}
