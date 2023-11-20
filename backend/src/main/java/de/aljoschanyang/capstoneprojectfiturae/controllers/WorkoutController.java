package de.aljoschanyang.capstoneprojectfiturae.controllers;

import de.aljoschanyang.capstoneprojectfiturae.services.WorkoutService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/workouts")
@AllArgsConstructor
public class WorkoutController {
    private WorkoutService workoutService;

}
