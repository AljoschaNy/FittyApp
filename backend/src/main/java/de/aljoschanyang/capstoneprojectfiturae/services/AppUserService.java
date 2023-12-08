package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUserDetails;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserService {
    private AppUserRepo appUserRepo;

    public AppUser addUser(AppUserDetails appUserDetails) {
        Optional<AppUser> existingUser = appUserRepo.findByEmail(appUserDetails.email());

        return existingUser.orElseGet(() -> appUserRepo.save(AppUser.builder()
                .name(appUserDetails.name())
                .email(appUserDetails.email())
                .imageUrl(appUserDetails.imageUrl())
                .build()));
    }

    public AppUser getUserById (String id) {
        return appUserRepo.findById(id).orElseThrow(NoSuchUserException::new);
    }
}
