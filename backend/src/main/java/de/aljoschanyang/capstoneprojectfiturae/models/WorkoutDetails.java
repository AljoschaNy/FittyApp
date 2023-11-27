package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

import java.util.List;

@Builder
public record WorkoutDetails(
      String userId,
      String workoutName,
      WeekDay workoutDay,
      String description,
      List<WorkoutExercise> plan
) {
}
