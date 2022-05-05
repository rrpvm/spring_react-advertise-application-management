package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import com.rrpvm.backend.models.BannerUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    private ResponseEntity<?> saveBanner(@PathVariable("id")int id, @RequestBody BannerUpdateRequest requestPayload) {
            BannerUpdateRequest  request = requestPayload;

     /*   List<Banner> banners = bannerRepository.findById(id).get();
        Banner changedBanner = (banners.stream().filter(banner -> banner.getId() == id).collect(Collectors.toList())).get(0);
        System.out.println(changedBanner.toString());
        System.out.println(payload.get(""));*/
        return ResponseEntity.ok("success");
    }
}
