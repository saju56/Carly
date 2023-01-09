package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); //select * from user where username = :username
/*
    User findByUsernameAndEmail(String username, String email, PageRequest.); //select * from user where username = :username and email = :email

    @Query(value = "select token from user where username like ?2 and email in :emails ")
    List<User> getToken(@Param("emails") Set<String> emails, String username, Pageable pageable);*/
}
