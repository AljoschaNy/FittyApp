package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

import java.util.List;

@Builder
public record WorkoutDetails(
      String userId,
      String name,
      WeekDay day,
      String description,
      List<WorkoutExercise> plan
) {
}
