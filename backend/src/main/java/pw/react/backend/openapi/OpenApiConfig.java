package pw.react.backend.openapi;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;

@Configuration
@ConfigurationProperties(prefix = "application.springdoc")
public class OpenApiConfig {

    private final Environment environment;
    private String description;
    private String version;
    private String title;

    public OpenApiConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    @Profile({"!jwt"})
    public OpenAPI openAPI() {
        return createOpenApi();
    }

    private OpenAPI createOpenApi() {
        String fullDescription = description +
                "\nActive profiles: " + String.join(",", environment.getActiveProfiles());
        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(fullDescription)
                        .termsOfService("http://swagger.io/terms/")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }

    @Bean
    @Profile({"jwt"})
    public OpenAPI jwtOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return createOpenApi()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Environment getEnvironment() {
        return environment;
    }

    public String getDescription() {
        return description;
    }

    public String getVersion() {
        return version;
    }

    public String getTitle() {
        return title;
    }
}
