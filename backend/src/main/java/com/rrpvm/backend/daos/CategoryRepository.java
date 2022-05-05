package com.rrpvm.backend.daos;
import com.rrpvm.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
