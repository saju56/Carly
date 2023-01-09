package pw.react.backend.web;

import pw.react.backend.models.User;

import javax.validation.constraints.Email;

public record UserDto(Long id, String username, String password, @Email String email) {

    public static UserDto valueFrom(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getPassword(), user.getEmail());
    }

    public static User convertToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.id());
        user.setUsername(userDto.username());
        user.setEmail(userDto.email());
        user.setPassword(userDto.password());
        return user;
    }
}
