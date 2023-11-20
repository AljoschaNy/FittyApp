package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WorkoutService {
    private WorkoutRepo workoutRepo;
    private UserRepo userRepo;

}
