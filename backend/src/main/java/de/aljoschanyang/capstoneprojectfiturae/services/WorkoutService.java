package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.models.User;
import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WorkoutService {
    private WorkoutRepo workoutRepo;
    private UserService userService;

    public Workout addWorkout(WorkoutDetailsDTO workoutDetails) {
        User user = userService.getUserById(workoutDetails.userId());

        return workoutRepo.save(Workout.builder()
                        .id(null)
                        .userId(user.id())
                        .workoutName(workoutDetails.workoutName())
                        .workoutDay(workoutDetails.workoutDay())
                        .description(workoutDetails.description())
                        .plan(workoutDetails.plan())
                .build());
    }
}
