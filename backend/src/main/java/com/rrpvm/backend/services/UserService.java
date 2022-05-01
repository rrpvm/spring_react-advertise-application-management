package com.rrpvm.backend.services;

import com.rrpvm.backend.daos.UserRepository;
import org.springframework.stereotype.Service;




@Service
public class UserService {
    private UserRepository userRepository;

    //методы
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


}
