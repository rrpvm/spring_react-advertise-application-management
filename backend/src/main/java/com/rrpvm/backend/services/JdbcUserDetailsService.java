package com.rrpvm.backend.services;

import com.rrpvm.backend.daos.UserRepository;
import com.rrpvm.backend.entities.User;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JdbcUserDetailsService implements UserDetailsService, InitializingBean {
    private static final String ADMIN_LOGIN = "rrpvm";
    private static final String ADMIN_PASSWORD = "12345";
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Override
    public void afterPropertiesSet() throws Exception { /*post-initialization, add admin to data base*/
        if (userRepository.findByLogin(ADMIN_LOGIN) == null)
            userRepository.save(new User(null, ADMIN_LOGIN, passwordEncoder.encode(ADMIN_PASSWORD), "ADMIN"));
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByLogin(username);
    }
}
