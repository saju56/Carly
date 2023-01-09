package pw.react.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.react.backend.dao.CompanyRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Company;
import pw.react.backend.models.CompanyLogo;
import pw.react.backend.services.CompanyService;
import pw.react.backend.services.LogoService;
import pw.react.backend.web.CompanyDto;
import pw.react.backend.web.UploadFileResponse;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(path = CompanyController.COMPANIES_PATH)
public class CompanyController {

    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);

    public static final String COMPANIES_PATH = "/companies";

    private final CompanyRepository repository;
    private final CompanyService companyService;
    private LogoService companyLogoService;

    public CompanyController(CompanyRepository repository, CompanyService companyService) {
        this.repository = repository;
        this.companyService = companyService;
    }

    @Autowired
    public void setCompanyLogoService(LogoService companyLogoService) {
        this.companyLogoService = companyLogoService;
    }

    @PostMapping(path = "")
    public ResponseEntity<Collection<CompanyDto>> createCompanies(@RequestHeader HttpHeaders headers,
                                                                  @Valid @RequestBody List<CompanyDto> companies) {
        logHeaders(headers);
        List<Company> createdCompanies = companies.stream().map(CompanyDto::convertToCompany).toList();
        List<CompanyDto> result = repository.saveAll(createdCompanies)
                .stream()
                .map(CompanyDto::valueFrom)
                .toList();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    @GetMapping(path = "/{companyId}")
    public ResponseEntity<CompanyDto> getCompany(@RequestHeader HttpHeaders headers, @PathVariable Long companyId) {
        logHeaders(headers);
        CompanyDto result = repository.findById(companyId)
                .map(CompanyDto::valueFrom)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Company with %d does not exist", companyId)));
        return ResponseEntity.ok(result);
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<CompanyDto>> getAllCompanies(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);
        return ResponseEntity.ok(repository.findAll().stream().map(CompanyDto::valueFrom).collect(toList()));
    }

    @PutMapping(path = "/{companyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCompany(@RequestHeader HttpHeaders headers, @PathVariable Long companyId,
                              @Valid @RequestBody CompanyDto updatedCompany) {
        logHeaders(headers);
        companyService.updateCompany(companyId, CompanyDto.convertToCompany(updatedCompany));
    }

    @DeleteMapping(path = "/{companyId}")
    public ResponseEntity<String> updateCompany(@RequestHeader HttpHeaders headers, @PathVariable Long companyId) {
        logHeaders(headers);
        boolean deleted = companyService.deleteCompany(companyId);
        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Company with id %s does not exists.", companyId));
        }
        return ResponseEntity.ok(String.format("Company with id %s deleted.", companyId));
    }

    @PostMapping("/{companyId}/logo")
    public ResponseEntity<UploadFileResponse> uploadLogo(@RequestHeader HttpHeaders headers,
                                                         @PathVariable Long companyId,
                                                         @RequestParam("file") MultipartFile file) {
        logHeaders(headers);
        CompanyLogo companyLogo = companyLogoService.storeLogo(companyId, file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/companies/" + companyId + "/logo/")
                .path(companyLogo.getFileName())
                .toUriString();
        UploadFileResponse response = new UploadFileResponse(
                companyLogo.getFileName(),
                fileDownloadUri,
                file.getContentType(),
                file.getSize()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(value = "/{companyId}/logo", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody byte[] getLog(@RequestHeader HttpHeaders headers, @PathVariable Long companyId) {
        logHeaders(headers);
        CompanyLogo companyLogo = companyLogoService.getCompanyLogo(companyId);
        return companyLogo.getData();
    }

    @Operation(summary = "Get logo for company")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Get log by company id",
                    content = {@Content(mediaType = "application/json")}
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized operation",
                    content = {@Content(mediaType = "application/json")}
            )
    })
    @GetMapping(value = "/{companyId}/logo2")
    public ResponseEntity<Resource> getLogo2(@RequestHeader HttpHeaders headers, @PathVariable Long companyId) {
        logHeaders(headers);
        CompanyLogo companyLogo = companyLogoService.getCompanyLogo(companyId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(companyLogo.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + companyLogo.getFileName() + "\"")
                .body(new ByteArrayResource(companyLogo.getData()));
    }

    @Operation(summary = "Delete logo for given company")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Logo deleted",
                    content = {@Content(mediaType = "application/json")}
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized operation",
                    content = {@Content(mediaType = "application/json")}
            )
    })
    @DeleteMapping(value = "/{companyId}/logo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeLogo(@RequestHeader HttpHeaders headers, @PathVariable String companyId) {
        logHeaders(headers);
        companyLogoService.deleteCompanyLogo(Long.parseLong(companyId));
    }

}
