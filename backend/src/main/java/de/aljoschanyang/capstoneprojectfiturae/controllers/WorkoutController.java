package de.aljoschanyang.capstoneprojectfiturae.controllers;

import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutEditDTO;
import de.aljoschanyang.capstoneprojectfiturae.services.WorkoutService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@AllArgsConstructor
public class WorkoutController {
    private WorkoutService workoutService;

    @PostMapping("")
    public Workout addWorkout(@RequestBody WorkoutDetailsDTO workoutDetailsDTO) {
        return workoutService.addWorkout(workoutDetailsDTO);
    }

    @GetMapping("/{userId}")
    public List<Workout> getAllWorkoutsByUserId(@PathVariable String userId) {
        return workoutService.getAllWorkoutsByUserId(userId);
    }

    @GetMapping("/details/{id}")
    public Workout getWorkoutById(@PathVariable String id) {
        return workoutService.getWorkoutById(id);
    }

    @PutMapping("/edit/{id}")
    public Workout editWorkout(@PathVariable String id, @RequestBody WorkoutEditDTO workoutDetails) {
        return workoutService.editWorkout(id,workoutDetails);
    }
}
