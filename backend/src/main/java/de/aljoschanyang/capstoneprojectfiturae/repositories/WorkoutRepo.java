package de.aljoschanyang.capstoneprojectfiturae.repositories;

import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepo extends MongoRepository<Workout, String> {
    List<Workout> findWorkoutsByUserId(String userId);
}
