package de.aljoschanyang.capstoneprojectfiturae.repositories;

import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepo extends MongoRepository<AppUser, String> {
}
