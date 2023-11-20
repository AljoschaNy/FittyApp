package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.models.User;
import de.aljoschanyang.capstoneprojectfiturae.models.UserDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepo userRepo;

    public User addUser(UserDetailsDTO userDetails) {
        return userRepo.save(User.builder()
                .id(null)
                .name(userDetails.name())
                .build());
    }

    public User getUserById (String id) {
        return userRepo.findById(id).orElseThrow(NoSuchUserException::new);
    }
}
