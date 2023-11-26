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

    @GetMapping("")
    public List<Workout> getAllWorkoutsByUserId() {
        return workoutService.getAllWorkoutsByUserId("655b5b283f332f4fcfbf02c0");
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
