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

class AppUserServiceTest {
    private final AppUserRepo mockAppUserRepo = mock(AppUserRepo.class);
    private final de.aljoschanyang.capstoneprojectfiturae.services.AppUserService appUserService = new de.aljoschanyang.capstoneprojectfiturae.services.AppUserService(mockAppUserRepo);

    @Test
    void addUser_whenUserDetailsProvided_thenSaveAndReturnUser() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name("Test")
                .email("email")
                .imageUrl("imgUrl")
                .build();
        AppUserDetails appUserDetails = new AppUserDetails(expected.id(), expected.name(), expected.email(), expected.imageUrl());

        when(mockAppUserRepo.save(any(AppUser.class))).thenReturn(expected);
        AppUser actual = appUserService.addUser(appUserDetails);
        verify(mockAppUserRepo).save(any(AppUser.class));

        assertEquals(expected,actual);
        assertNotNull(actual.id(), "the id should not be null");
    }

    @Test
    void addUser_whenNoUserDetailsProvided_thenSaveAndReturnUserWithNullDetails() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name(null)
                .email(null)
                .imageUrl(null)
                .build();
        AppUserDetails appUserDetails = new AppUserDetails(null,null,null,null);

        when(mockAppUserRepo.save(any(AppUser.class))).thenReturn(expected);
        AppUser actual = appUserService.addUser(appUserDetails);
        verify(mockAppUserRepo).save(any(AppUser.class));

        assertEquals(expected,actual);
        assertNotNull(actual.id(), "the id should not be null");
    }

    @Test
    void getUserById_whenIdIsCorrect_thenReturnUser() {
        AppUser expected = AppUser.builder()
                .id("1")
                .name("Test")
                .email("email")
                .imageUrl("imgUrl")
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