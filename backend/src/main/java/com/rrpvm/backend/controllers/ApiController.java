package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import com.rrpvm.backend.exceptions.BannerNameAlreadyExist;

import javax.validation.constraints.Null;
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
    @PutMapping("/banners/save/{id}")
    private ResponseEntity<Nullable> saveBanner(@PathVariable("id") int id, @RequestBody Banner customBanner) throws BannerNameAlreadyExist {
        Banner existBanner = bannerRepository.findBannerByName(customBanner.getName());
        if (existBanner != null && (existBanner.getId() != customBanner.getId())) {//different banners but existed name, in save() will be test by id (finds the id's)
            throw new BannerNameAlreadyExist();
        }
        return ResponseEntity.ok(null);
    }
    @ExceptionHandler( BannerNameAlreadyExist.class )
    public ResponseEntity<Nullable> handleBannerNameAlreadyExistException() {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }
}
