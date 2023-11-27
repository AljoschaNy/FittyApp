package de.aljoschanyang.capstoneprojectfiturae.controllers;

import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetails;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutEdit;
import de.aljoschanyang.capstoneprojectfiturae.services.WorkoutService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@AllArgsConstructor
public class WorkoutController {
    private WorkoutService workoutService;

    @PostMapping
    public Workout addWorkout(@RequestBody WorkoutDetails workoutDetails) {
        return workoutService.addWorkout(workoutDetails);
    }

    @GetMapping("/{userId}")
    public List<Workout> getAllWorkoutsByUserId(@PathVariable String userId) {
        return workoutService.getAllWorkoutsByUserId(userId);
    }

    @GetMapping("/details/{id}")
    public Workout getWorkoutById(@PathVariable String id) {
        return workoutService.getWorkoutById(id);
    }

    @PutMapping("/{id}")
    public Workout editWorkout(@PathVariable String id, @RequestBody WorkoutEdit workoutEdit) {
        return workoutService.editWorkout(id,workoutEdit);
    }
}
