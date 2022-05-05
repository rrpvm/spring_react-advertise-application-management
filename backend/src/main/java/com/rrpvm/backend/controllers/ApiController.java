package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import com.rrpvm.backend.exceptions.BannerLinkedCategoriesEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
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
        List<Banner> banners = bannerRepository.findAllByIsDeleted(false);
        return banners;
    }

    @GetMapping("/categories")
    private List<Category> responseCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    @PutMapping("/banners/save/{id}")
    private ResponseEntity<Nullable> saveBanner(@PathVariable("id") Long id, @RequestBody Banner customBanner) throws BannerNameAlreadyExist {
        Banner existBanner = bannerRepository.findBannerByName(customBanner.getName());
        Banner savedBanner = null;
        if (existBanner != null && (existBanner.getId() != customBanner.getId())) {//different banners but existed name, in save() will be test by id (finds the id's)
            throw new BannerNameAlreadyExist();
        }
        if(customBanner.getLinkedCategories().size() == 0){
            throw new BannerLinkedCategoriesEmpty();
        }
        try {
            savedBanner = bannerRepository.save(customBanner);
        } catch (Exception e) {

        }
        return ResponseEntity.ok(null);
    }
    @DeleteMapping("/banners/delete/{id}")//updateMapping because updates the field (is_deleted) : | still delete mapping
    private ResponseEntity<Nullable> deleteBanner(@PathVariable("id") Long id) throws BannerNameAlreadyExist {

        if (bannerRepository.findById(id).isEmpty()) {//different banners but existed name, in save() will be test by id (finds the id's)
          //  throw new BannerNameAlreadyExist();
        }
        else{
            bannerRepository.deleteBannerById(id);
        }
        return ResponseEntity.ok(null);
    }
    @ExceptionHandler({BannerNameAlreadyExist.class})
    public ResponseEntity<Nullable> handleBannerNameAlreadyExistException() {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }
    @ExceptionHandler({BannerLinkedCategoriesEmpty.class})
    public ResponseEntity<Nullable> handleBannerLinkedCategoriesIsEmptyException(){
        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(null);
    }
}
