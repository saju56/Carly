package pw.react.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import pw.react.backend.services.HttpService;

import java.util.Collections;
import java.util.HashMap;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

@SpringBootTest
@ActiveProfiles(profiles = {"mysql-dev"})
class BackendApplicationTests {

	@Autowired
	private HttpService httpService;

	@Autowired
	private RestTemplate restTemplate;

	@Test
	void contextLoads() {
	}

	@Test
	void whenConsume_thenReturnQuote() {
	//https://api.dane.gov.pl/doc
		try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("accept", "application/vnd.api+json");
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> httpEntity = new HttpEntity<>("", headers);

            var uriVariables = new HashMap<String, Object>();
            uriVariables.put("page", 1);
            uriVariables.put("per_page", 1);
			restTemplate.postForEntity("https://api.dane.gov.pl/institutions",
                    httpEntity,
                    String.class,
                    uriVariables);
			fail("Should throw any exception");
		} catch (Exception ex) {
			assertThat(ex).isInstanceOf(HttpClientErrorException.Forbidden.class);
		}
	}
}
