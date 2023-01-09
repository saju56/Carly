package pw.react.backend.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import pw.react.backend.models.User;
import pw.react.backend.security.models.JwtRequest;
import pw.react.backend.security.models.JwtResponse;
import pw.react.backend.web.CompanyDto;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles({"it","jwt"})
class HttpBaseServiceTest {
    @Autowired
    RestTemplate restTemplate;
    @Value("${azure.backend.url}")
    private String url;

    @Test
    void given_whenName_then() {
        final ResponseEntity<JwtResponse> response1 = restTemplate.postForEntity(
                url + "/auth/login", new JwtRequest("pawg", "pw2021"), JwtResponse.class
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + response1.getBody().jwttoken());

        final ResponseEntity<List<CompanyDto>> response3 = restTemplate.exchange(
                url + "/companies",
                HttpMethod.GET,
                new HttpEntity<>(new User(), headers),
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(1, response3.getBody().size());

    }
}