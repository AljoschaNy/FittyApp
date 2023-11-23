package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

@Builder
public record WorkoutExercise(
        String name,
        int setCount,
        int repsPerSet,
        double weightInKg,
        int breakInSec
) {
}
