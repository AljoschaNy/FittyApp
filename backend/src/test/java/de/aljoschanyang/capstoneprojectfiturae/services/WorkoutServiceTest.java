package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.models.User;
import de.aljoschanyang.capstoneprojectfiturae.models.WeekDay;
import de.aljoschanyang.capstoneprojectfiturae.models.Workout;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {
    private final UserRepo mockUserRepo = mock(UserRepo.class);
    private final WorkoutRepo mockWorkoutRepo = mock(WorkoutRepo.class);
    private final UserService userService = new UserService(mockUserRepo);
    private final WorkoutService workoutService = new WorkoutService(mockWorkoutRepo, userService);

    private final User user = User.builder()
            .id("userId")
            .name("Test")
            .build();

    @Test
    void addWorkout_whenUserExistsInDb_thenReturnWorkout() {
        Workout expected = Workout.builder()
                .id("workoutId")
                .userId(user.id())
                .workoutName("Test workout")
                .workoutDay(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();

        WorkoutDetailsDTO workoutDetails = WorkoutDetailsDTO.builder()
                .userId(user.id())
                .workoutName("Test workout")
                .workoutDay(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();

        when(mockUserRepo.findById(user.id())).thenReturn(Optional.of(user));
        when(mockWorkoutRepo.save(any(Workout.class))).thenReturn(expected);
        Workout actual = workoutService.addWorkout(workoutDetails);

        verify(mockUserRepo).findById(user.id());
        verify(mockWorkoutRepo).save(any(Workout.class));
        assertEquals(expected,actual);
    }

    @Test
    void addWorkout_whenUserDoesNotExistInDb_thenThrowException() {
        WorkoutDetailsDTO workoutDetails = WorkoutDetailsDTO.builder()
                .userId("invalidUserId")
                .workoutName("Test workout")
                .workoutDay(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();

        assertThrows(NoSuchUserException.class, () -> workoutService.addWorkout(workoutDetails));
        verify(mockUserRepo).findById("invalidUserId");
    }
}