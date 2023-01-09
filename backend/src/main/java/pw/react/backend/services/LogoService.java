package pw.react.backend.services;

import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.models.CompanyLogo;

public interface LogoService {
    CompanyLogo storeLogo(long companyId, MultipartFile file);
    CompanyLogo getCompanyLogo(long companyId);
    void deleteCompanyLogo(long companyId);
}
