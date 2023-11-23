package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

import java.util.List;

@Builder
public record WorkoutDetailsDTO(
      String userId,
      String workoutName,
      WeekDay workoutDay,
      String description,
      List<WorkoutExercise> plan
) {
}
