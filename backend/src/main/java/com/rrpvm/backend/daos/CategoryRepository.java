package com.rrpvm.backend.daos;

import com.rrpvm.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findAllByBanner_Id(Integer banner_id);//many to one, 1 banner id , many categories id
}
