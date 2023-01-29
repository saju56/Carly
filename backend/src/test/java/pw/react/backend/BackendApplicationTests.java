package pw.react.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pw.react.backend.web.utils.UpdateNotifier;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.fail;

@SpringBootTest
@ActiveProfiles(profiles = {"mysql-dev"})
class BackendApplicationTests {

	private UpdateNotifier updateNotifier;
	@Test
	void contextLoads() {
	}

	@Test
	public void shouldSendNotificationToBookly() {
		UUID uuid = UUID.randomUUID();
		try {
			updateNotifier.notifyBookly(List.of(uuid));
		} catch (IOException exception) {
			fail("Sending notification to Bookly failed");
		}
	}
}
