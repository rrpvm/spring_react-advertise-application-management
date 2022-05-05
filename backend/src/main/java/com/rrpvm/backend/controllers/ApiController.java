package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rrpvm.backend.exceptions.BannerNameAlreadyExist;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/private")
public class ApiController {
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/banners")
    private List<Banner> responseBanners() {
        List<Banner> banners = bannerRepository.findAll();
        return banners;
    }

    @GetMapping("/categories")
    private List<Category> responseCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }
    private ResponseEntity<?> saveBanner(@PathVariable("id") int id, @RequestBody Banner customBanner) throws BannerNameAlreadyExist {
        Banner existBanner = bannerRepository.findBannerByName(customBanner.getName());
        if (existBanner != null && (existBanner.getId() != customBanner.getId())) {//different banners but existed name, in save() will be test by id (finds the id's)
            throw new BannerNameAlreadyExist();
        }
        return ResponseEntity.ok(bannerRepository.save(customBanner));
    }
}
