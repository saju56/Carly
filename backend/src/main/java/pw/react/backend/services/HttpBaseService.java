package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import pw.react.backend.models.User;
import pw.react.backend.security.models.JwtRequest;
import pw.react.backend.security.models.JwtResponse;
import pw.react.backend.web.CompanyDto;

public class HttpBaseService implements HttpService {

    private final Logger logger = LoggerFactory.getLogger(HttpBaseService.class);

    private final RestTemplate restTemplate;

    public HttpBaseService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Object consume(String url) {
        final Object object = restTemplate.getForObject(url, String.class);

        final ResponseEntity<CompanyDto> response = restTemplate.getForEntity(
                "https://carly.prod.backend", CompanyDto.class
        );
        final ResponseEntity<JwtResponse> response1 = restTemplate.postForEntity(
                "https://carly.prod.backend/auth/login", new JwtRequest("pawg", "pw2021"), JwtResponse.class
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + response1.getBody().jwttoken());

        final ResponseEntity<CompanyDto> response3 = restTemplate.exchange(
                "https://carly.prod.backend",
                HttpMethod.POST,
                new HttpEntity<>(new User(), headers),
                CompanyDto.class
        );

        restTemplate.delete("https://carly.prod.backend");

        if (object != null) {
            logger.info("This is Quote: {}", object);
        } else {
            logger.warn("Quote is null");
        }
        return object;
    }
}
