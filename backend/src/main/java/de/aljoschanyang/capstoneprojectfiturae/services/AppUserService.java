package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserService {
    private AppUserRepo appUserRepo;

    public AppUser addUser(AppUser appUser) {
        Optional<AppUser> existingUser = appUserRepo.findById(appUser.id());

        return existingUser.orElseGet(() -> appUserRepo.save(AppUser.builder()
                        .id(appUser.id())
                        .name(appUser.name())
                        .email(appUser.email())
                        .imageUrl(appUser.imageUrl())
                        .build()));
    }

    public AppUser getUserById (String id) {
        return appUserRepo.findById(id).orElseThrow(NoSuchUserException::new);
    }
}
