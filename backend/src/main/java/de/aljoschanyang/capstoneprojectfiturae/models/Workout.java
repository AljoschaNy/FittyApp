package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Builder
@Document(collection = "workouts")
public record Workout(
        @Id
        String id,
        @Field("user_id")
        String userId,
        @Field("workout_name")
        String name,
        @Field("workout_day")
        WeekDay day,
        @Field("workout_description")
        String description,
        @Field("workout_plan")
        List<WorkoutExercise> plan
) {
}
