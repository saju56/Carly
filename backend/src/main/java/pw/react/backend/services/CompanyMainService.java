package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pw.react.backend.dao.CompanyRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Company;

class CompanyMainService implements CompanyService {
    private final Logger logger = LoggerFactory.getLogger(CompanyMainService.class);

    private CompanyRepository repository;

    CompanyMainService() { /*Needed only for initializing spy in unit tests*/}

    CompanyMainService(CompanyRepository repository) {
        this.repository = repository;
    }

    @Override
    public Company updateCompany(Long id, Company updatedCompany) throws ResourceNotFoundException {
        if (repository.existsById(id)) {
            updatedCompany.setId(id);
            Company result = repository.save(updatedCompany);
            logger.info("Company with id {} updated.", id);
            return result;
        }
        throw new ResourceNotFoundException(String.format("Company with id [%d] not found.", id));
    }

    @Override
    public boolean deleteCompany(Long companyId) {
        boolean result = false;
        if (repository.existsById(companyId)) {
            repository.deleteById(companyId);
            logger.info("Company with id {} deleted.", companyId);
            result = true;
        }
        return result;
    }
}
