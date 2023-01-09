package pw.react.backend.web;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pw.react.backend.models.Company;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import java.time.LocalDateTime;

public record CompanyDto(long id, String name,
                         @JsonDeserialize(using = JsonDateDeserializer.class) @JsonSerialize(using = JsonDateSerializer.class)
                         LocalDateTime startDateTime,
                         int boardMembers) {
    public static final CompanyDto EMPTY = new CompanyDto(-1, "", null, -1);

    public static CompanyDto valueFrom(Company company) {
        return new CompanyDto(company.getId(), company.getName(), company.getStartDateTime(), company.getBoardMembers());
    }

    public static Company convertToCompany(CompanyDto dto) {
        Company company = new Company();
        company.setId(dto.id());
        company.setName(dto.name());
        company.setStartDateTime(dto.startDateTime());
        company.setBoardMembers(dto.boardMembers());
        return company;
    }

}
