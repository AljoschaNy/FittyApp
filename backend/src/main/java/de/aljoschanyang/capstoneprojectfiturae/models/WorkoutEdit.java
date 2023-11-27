package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

import java.util.List;

@Builder
public record WorkoutEdit(
        String workoutName,
        WeekDay workoutDay,
        String description,
        List<WorkoutExercise> plan
) {
}
