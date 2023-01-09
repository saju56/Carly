package pw.react.backend.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.util.MimeTypeUtils;
import pw.react.backend.dao.CompanyLogoRepository;
import pw.react.backend.exceptions.ExceptionDetails;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static final long serialVersionUID = -7858869558953243875L;
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Autowired
    CompanyLogoRepository companyLogoRepository;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        var res = companyLogoRepository.findByCompanyId(12);
        log.error("Unauthorized error: {}", authException.getMessage());
        ObjectMapper objectMapper = new ObjectMapper();
        ExceptionDetails exceptionDetails = new ExceptionDetails(HttpStatus.UNAUTHORIZED, authException.getMessage());
        exceptionDetails.setPath(request.getRequestURI());
        String errJson = objectMapper.writeValueAsString(exceptionDetails);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
        response.getOutputStream().write(errJson.getBytes(StandardCharsets.UTF_8));
    }
}
