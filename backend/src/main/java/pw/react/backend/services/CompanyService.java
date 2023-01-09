package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Company;

public interface CompanyService {
    Company updateCompany(Long id, Company updatedCompany) throws ResourceNotFoundException;
    boolean deleteCompany(Long companyId);
}
