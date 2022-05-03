package com.rrpvm.backend.services;

import com.rrpvm.backend.daos.UserRepository;
import com.rrpvm.backend.entities.User;
import com.rrpvm.backend.exceptions.UserAlreadyExistException;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JdbcUserDetailsService implements UserDetailsService, InitializingBean {
    private static final String ADMIN_LOGIN = "rrpvm";
    private static final String ADMIN_PASSWORD = "12345";
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return userRepository.findByLogin(login);
    }

    @Override
    public void afterPropertiesSet() throws Exception { /*post-initialization, add admin to data base*/
        if (userRepository.findByLogin(ADMIN_LOGIN) == null)
            userRepository.save(new User(null, ADMIN_LOGIN, passwordEncoder.encode(ADMIN_PASSWORD), "ADMIN"));

    }
}
