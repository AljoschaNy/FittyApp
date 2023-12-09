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
        if(appUser.id() != null) {
            Optional<AppUser> existingUser = appUserRepo.findById(appUser.id());
            return existingUser.orElse(appUserRepo.save(appUser));
        } else {
            return appUserRepo.save(appUser);
        }
    }

    public AppUser getUserById (String id) {
        return appUserRepo.findById(id).orElseThrow(NoSuchUserException::new);
    }
}
