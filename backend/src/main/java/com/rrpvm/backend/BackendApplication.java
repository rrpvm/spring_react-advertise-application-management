package com.rrpvm.backend;

import com.rrpvm.backend.daos.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);
    }

}
