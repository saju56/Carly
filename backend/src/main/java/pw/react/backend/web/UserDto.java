package pw.react.backend.web;

import pw.react.backend.models.User;

import javax.validation.constraints.Email;
import java.util.UUID;

public record UserDto(UUID id, String username, String name, String surname, boolean isAdmin, String password, @Email String email) {

    public static UserDto valueFrom(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getSurname(), user.isAdmin(),
                user.getPassword(), user.getEmail());
    }

    public static User convertToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.id());
        user.setUsername(userDto.username());
        user.setEmail(userDto.email());
        user.setPassword(userDto.password());
        user.setName(userDto.name());
        user.setSurname(userDto.surname());
        user.setAdmin(userDto.isAdmin());
        return user;
    }
}
