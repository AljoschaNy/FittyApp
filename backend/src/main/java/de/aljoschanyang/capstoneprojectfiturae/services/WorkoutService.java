package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchWorkoutException;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetails;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutEdit;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WorkoutService {
    private WorkoutRepo workoutRepo;
    private AppUserService appUserService;

    public Workout addWorkout(WorkoutDetails workoutDetails) {
        AppUser appUser = appUserService.getUserById(workoutDetails.userId());

        return workoutRepo.save(Workout.builder()
                        .id(null)
                        .userId(appUser.id())
                        .name(workoutDetails.name())
                        .day(workoutDetails.day())
                        .description(workoutDetails.description())
                        .plan(workoutDetails.plan())
                .build());
    }

    public List<Workout> getAllWorkoutsByUserId(String userId) {
        appUserService.getUserById(userId);
        return workoutRepo.findWorkoutsByUserId(userId);
    }

    public Workout getWorkoutById(String id) {
        return workoutRepo.findById(id).orElseThrow(NoSuchWorkoutException::new);
    }

    public Workout editWorkout(String id, WorkoutEdit workoutEdit) {
        Workout legacy = getWorkoutById(id);
        return workoutRepo.save(Workout.builder()
                        .id(legacy.id())
                        .userId(legacy.userId())
                        .name(workoutEdit.name())
                        .day(workoutEdit.day())
                        .description(workoutEdit.description())
                        .plan(workoutEdit.plan())
                .build());
    }

    public void deleteWorkout(String id) {
        workoutRepo.deleteById(id);
    }
}
