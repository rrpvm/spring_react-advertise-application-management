package com.rrpvm.backend.daos.custom;

import com.rrpvm.backend.entities.Banner;

public interface CustomizeBannerRepository  {
    boolean deleteBannerById(Long id);
    void addNewBanner(Banner ref);
}
