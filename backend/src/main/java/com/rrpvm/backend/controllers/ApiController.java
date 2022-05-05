package com.rrpvm.backend.controllers;

import com.rrpvm.backend.daos.BannerRepository;
import com.rrpvm.backend.daos.CategoryRepository;
import com.rrpvm.backend.entities.Banner;
import com.rrpvm.backend.entities.Category;
import com.rrpvm.backend.exceptions.BannerLinkedCategoriesEmpty;
import com.rrpvm.backend.exceptions.IncorrectIdException;
import com.rrpvm.backend.exceptions.UnUniqueDataRequestedException;
import com.rrpvm.backend.exceptions.UniqueNameAlreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/private")
public class ApiController {
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/getBanners")
    private List<Banner> responseBanners() {
        List<Banner> banners = bannerRepository.findAllByIsDeleted(false);
        return banners;
    }

    @GetMapping("/getCategories")
    private List<Category> responseCategories() {
        List<Category> categories = categoryRepository.findAllByDeleted(false);
        return categories;
    }

    @PutMapping("/banners/save/{id}")
    private ResponseEntity<Nullable> saveBanner(@PathVariable("id") Long id, @RequestBody Banner customBanner, @RequestParam(name = "createNew") boolean params) throws UniqueNameAlreadyExist {
        if (customBanner == null) return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        if (customBanner.getLinkedCategories().size() == 0) throw new BannerLinkedCategoriesEmpty();
        Banner withUniqueName = bannerRepository.findBannerByName(customBanner.getName());
        boolean bUnique = withUniqueName == null || withUniqueName.getId() == customBanner.getId();
        if (bUnique) {
            if (params) {
                bannerRepository.addNewBanner(customBanner);//delete var init
            } else bannerRepository.save(customBanner);
        } else throw new UniqueNameAlreadyExist();
        return ResponseEntity.ok(null);
    }

    @PutMapping("/categories/save/{id}")
    private ResponseEntity<Nullable> saveCategory(@PathVariable("id") Long id, @RequestBody Category customCategory, @RequestParam(name = "createNew") boolean params) throws UnUniqueDataRequestedException {
        if (customCategory == null) return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        Category withUniqueName = categoryRepository.findCategoryByName(customCategory.getName());
        Category withUniqueRequestId = categoryRepository.findCategoryByRequestId(customCategory.getRequestId());
        boolean isUnique = (withUniqueName == null || withUniqueName.getId() == customCategory.getId()) && (withUniqueRequestId == null || withUniqueRequestId.getId() == customCategory.getId());
        if (!isUnique) {
            throw new UnUniqueDataRequestedException();
        } else {
            if (params) {
                categoryRepository.addNewCategory(customCategory);
            } else categoryRepository.save(customCategory);
        }
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/banners/delete/{id}")
    private ResponseEntity<Nullable> deleteBanner(@PathVariable("id") Long id) throws IncorrectIdException { //updateMapping because updates the field (is_deleted) : | still delete mapping
        if (bannerRepository.findById(id).isEmpty()) {//different banners but existed name, in save() will be test by id (finds the id's)
            throw new IncorrectIdException();
        } else {
            bannerRepository.deleteBannerById(id);
        }
        return ResponseEntity.ok(null);
    }

    @PutMapping("/categories/delete/{id}")
    private ResponseEntity<Nullable> deleteCategory(@PathVariable("id") Long id) throws IncorrectIdException {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.get() == null) {//different banners but existed name, in save() will be test by id (finds the id's)
            throw new IncorrectIdException();
        } else {
            Category ctx = category.get();
            //check for link by banners:
            if (categoryRepository.isUndependent(id)) {
                ctx.setDeleted(true);
                categoryRepository.save(ctx);
            } else /*throw exception be like : categoryLinkedException*/
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        return ResponseEntity.ok(null);
    }

    @ExceptionHandler({UniqueNameAlreadyExist.class, IncorrectIdException.class, UnUniqueDataRequestedException.class})
    public ResponseEntity<Nullable> IncorrectInputHandlerException() {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

    @ExceptionHandler({BannerLinkedCategoriesEmpty.class})
    public ResponseEntity<Nullable> handleBannerLinkedCategoriesIsEmptyException() {
        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(null);
    }
}
