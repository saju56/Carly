package pw.react.backend.security.configs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.filter.OncePerRequestFilter;
import pw.react.backend.dao.TokenRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.security.filters.JwtAuthenticationEntryPoint;
import pw.react.backend.security.filters.JwtRequestFilter;
import pw.react.backend.security.services.JwtTokenService;
import pw.react.backend.security.services.JwtUserDetailsService;

import javax.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Profile("jwt")
public class JwtConfig {

    private static final Logger log = LoggerFactory.getLogger(JwtConfig.class);

    private String secret;
    private long expirationMs;

    @PostConstruct
    private void init() {
        log.debug("************** JWT properties **************");
        log.debug("JWT secret: {}", secret);
        log.debug("JWT expirationMs: {}", expirationMs);
    }

    @Bean
    public JwtUserDetailsService jwtUserDetailsService(UserRepository userRepository) {
        return new JwtUserDetailsService(userRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtTokenService jwtTokenService(TokenRepository tokenRepository) {
        return new JwtTokenService(secret, expirationMs, tokenRepository);
    }

    @Bean
    public OncePerRequestFilter jwtRequestFilter(UserRepository userRepository, TokenRepository tokenRepository) {
        return new JwtRequestFilter(jwtUserDetailsService(userRepository), jwtTokenService(tokenRepository));
    }

    @Bean
    public AuthenticationEntryPoint jwtAuthenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    public void setExpirationMs(long expirationMs) {
        this.expirationMs = expirationMs;
    }
}

