package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUserDetails;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppAppUserServiceTest {
    private final AppUserRepo mockAppUserRepo = mock(AppUserRepo.class);
    private final AppUserService appUserService = new AppUserService(mockAppUserRepo);

    @Test
    void addUser_whenUserNameAdded_thenReturnUserWithThisName() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name("Test")
                .build();
        AppUserDetails appUserDetails = new AppUserDetails("Test");

        when(mockAppUserRepo.save(any(AppUser.class))).thenReturn(expected);
        AppUser actual = appUserService.addUser(appUserDetails);
        verify(mockAppUserRepo).save(any(AppUser.class));

        assertEquals(expected.name(),actual.name());
        assertNotNull(actual.id(), "the id should not be null");
    }

    @Test
    void addUser_whenNoUserNameAdded_thenReturnUserNameNull() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name(null)
                .build();
        AppUserDetails appUserDetails = new AppUserDetails(null);

        when(mockAppUserRepo.save(any(AppUser.class))).thenReturn(expected);
        AppUser actual = appUserService.addUser(appUserDetails);
        verify(mockAppUserRepo).save(any(AppUser.class));

        assertEquals(expected.name(),actual.name());
        assertNotNull(actual.id(), "the id should not be null");
    }

    @Test
    void getUserById_whenIdIsCorrect_thenReturnUser() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name("Test")
                .build();

        when(mockAppUserRepo.findById(expected.id())).thenReturn(Optional.of(expected));
        AppUser actual = appUserService.getUserById(expected.id());

        verify(mockAppUserRepo).findById(expected.id());
        assertEquals(expected, actual);
    }

    @Test
    void getUserById_whenIdIsIncorrect_thenThrowException() {
        assertThrows(NoSuchUserException.class, () -> appUserService.getUserById("invalidId"));
        verify(mockAppUserRepo).findById("invalidId");
    }
}