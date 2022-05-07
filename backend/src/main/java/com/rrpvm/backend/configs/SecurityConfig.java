package com.rrpvm.backend.configs;

import com.rrpvm.backend.filters.JwtTokenAuthorizationOncePerRequestFilter;
import com.rrpvm.backend.jwt.JwtUnAuthorizedResponseAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableConfigurationProperties
@EnableWebMvc
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;
    @Autowired
    private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/authenticate", "/refresh", "/api/public/*", "/*")
                .permitAll()
                .anyRequest().authenticated();
        httpSecurity
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity.cors();
    }
}



