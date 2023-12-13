package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record WorkoutEdit(
        String name,
        LocalDate day,
        String description,
        List<WorkoutExercise> plan
) {
}
