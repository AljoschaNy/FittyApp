package de.aljoschanyang.capstoneprojectfiturae.models;

import java.util.List;

public record WorkoutEditDTO(
        String workoutName,
        WeekDay workoutDay,
        String description,
        List<WorkoutExercise> plan
) {
}
