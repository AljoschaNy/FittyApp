package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.models.User;
import de.aljoschanyang.capstoneprojectfiturae.models.UserDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {
    private final UserRepo mockUserRepo = mock(UserRepo.class);
    private final UserService userService = new UserService(mockUserRepo);

    @Test
    void addUser_whenUserNameAdded_thenReturnUserWithThisName() {
        User expected = User.builder()
                .id("1")
                .name("Test")
                .build();
        UserDetailsDTO userDetails = new UserDetailsDTO("Test");

        when(mockUserRepo.save(any(User.class))).thenReturn(expected);
        User actual = userService.addUser(userDetails);
        verify(mockUserRepo).save(any(User.class));

        assertEquals(expected.name(),actual.name());
        assertNotNull(actual.id(), "the id should not be null");
    }

    @Test
    void addUser_whenNoUserNameAdded_thenReturnUserNameNull() {
        User expected = User.builder()
                .id("1")
                .name(null)
                .build();
        UserDetailsDTO userDetails = new UserDetailsDTO(null);

        when(mockUserRepo.save(any(User.class))).thenReturn(expected);
        User actual = userService.addUser(userDetails);
        verify(mockUserRepo).save(any(User.class));

        assertEquals(expected.name(),actual.name());
        assertNotNull(actual.id(), "the id should not be null");
    }
}