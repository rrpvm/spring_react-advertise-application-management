package com.rrpvm.backend.daos;

import com.rrpvm.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    User findByLogin(String login);
}
