package de.aljoschanyang.capstoneprojectfiturae.repositories;

import de.aljoschanyang.capstoneprojectfiturae.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
}
