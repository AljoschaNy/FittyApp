package de.aljoschanyang.capstoneprojectfiturae.services;

import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchUserException;
import de.aljoschanyang.capstoneprojectfiturae.exceptions.NoSuchWorkoutException;
import de.aljoschanyang.capstoneprojectfiturae.models.*;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {
    private final AppUserRepo mockAppUserRepo = mock(AppUserRepo.class);
    private final WorkoutRepo mockWorkoutRepo = mock(WorkoutRepo.class);
    private final AppUserService appUserService = new AppUserService(mockAppUserRepo);
    private final WorkoutService workoutService = new WorkoutService(mockWorkoutRepo, appUserService);

    private final AppUser appUser = AppUser.builder()
            .id("userId")
            .build();
    private final LocalDate testDate = LocalDate.of(2023,12,15);


    @Test
    void addWorkout_whenUserExistsInDb_thenReturnWorkout() {
        Workout expected = Workout.builder()
                .id("workoutId")
                .userId(appUser.id())
                .name("Test workout")
                .day(testDate)
                .description("Test description")
                .plan(List.of())
                .build();

        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId(expected.userId())
                .name(expected.name())
                .day(expected.day())
                .description(expected.description())
                .plan(expected.plan())
                .build();

        when(mockAppUserRepo.findById(appUser.id())).thenReturn(Optional.of(appUser));
        when(mockWorkoutRepo.save(any(Workout.class))).thenReturn(expected);
        Workout actual = workoutService.addWorkout(workoutDetails);

        verify(mockAppUserRepo).findById(appUser.id());
        verify(mockWorkoutRepo).save(any(Workout.class));
        assertEquals(expected,actual);
    }

    @Test
    void addWorkout_whenUserDoesNotExistInDb_thenThrowException() {
        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId("invalidUserId")
                .name("Test workout")
                .day(testDate)
                .description("Test description")
                .plan(List.of())
                .build();

        assertThrows(NoSuchUserException.class, () -> workoutService.addWorkout(workoutDetails));
        verify(mockAppUserRepo).findById("invalidUserId");
    }

    @Test
    void getAllWorkoutsByUserId_whenUserExists_thenReturnWorkouts() {
        Workout workout1 = Workout.builder()
                .id("workoutId")
                .userId(appUser.id())
                .name("Test workout")
                .day(testDate)
                .description("Test description")
                .plan(List.of())
                .build();
        List<Workout> expectedWorkouts = List.of(workout1);

        when(mockAppUserRepo.findById(workout1.userId())).thenReturn(Optional.of(appUser));
        when(mockWorkoutRepo.findWorkoutsByUserId(workout1.userId())).thenReturn(expectedWorkouts);

        List<Workout> actualWorkouts = workoutService.getAllWorkoutsByUserId(workout1.userId());

        verify(mockAppUserRepo).findById(workout1.userId());
        verify(mockWorkoutRepo).findWorkoutsByUserId(workout1.userId());
        assertEquals(expectedWorkouts, actualWorkouts);
    }

    @Test
    void getAllWorkoutsByUserId_whenUserDoesNotExist_thenThrowException() {
        String userId = "invalidUserId";

        when(mockAppUserRepo.findById(userId)).thenThrow(new NoSuchUserException());

        assertThrows(NoSuchUserException.class, () -> workoutService.getAllWorkoutsByUserId(userId));
        verify(mockAppUserRepo).findById(userId);
        verify(mockWorkoutRepo, never()).findWorkoutsByUserId(anyString());
    }

    @Test
    void getWorkoutById_whenIdIsValid_thenReturnWorkout() {
        Workout expected = Workout.builder()
                .id("validWorkoutId")
                .userId("1")
                .name("Test workout")
                .day(testDate)
                .description("Test description")
                .plan(List.of())
                .build();

        when(mockWorkoutRepo.findById(any(String.class))).thenReturn(Optional.of(expected));
        Workout actual = workoutService.getWorkoutById(expected.id());

        verify(mockWorkoutRepo).findById(expected.id());
        assertEquals(expected,actual);
    }

    @Test
    void getWorkoutById_whenIdIsInvalid_thenThrowException() {
        when(mockWorkoutRepo.findById(any(String.class))).thenThrow(NoSuchWorkoutException.class);
        assertThrows(NoSuchWorkoutException.class, () -> workoutService.getWorkoutById("invalidId"));
        verify(mockWorkoutRepo).findById("invalidId");
    }

    @Test
    void editWorkout_whenValidData_thenReturnWorkout() {
        Workout legacyWorkout = Workout.builder()
                .id("validWorkoutId")
                .userId("1")
                .name("Test workout")
                .day(testDate)
                .description("Test description")
                .plan(List.of())
                .build();

        WorkoutEdit workoutEdit = WorkoutEdit.builder()
                .name("Changed workout")
                .day(testDate)
                .description("Changed description")
                .plan(List.of())
                .build();

        Workout expected = Workout.builder()
                .id("validWorkoutId")
                .userId("1")
                .name("Changed workout")
                .day(testDate)
                .description("Changed description")
                .plan(List.of())
                .build();

        when(mockWorkoutRepo.findById(legacyWorkout.id())).thenReturn(Optional.of(legacyWorkout));
        when(mockWorkoutRepo.save(any(Workout.class))).thenReturn(expected);

        Workout actual = workoutService.editWorkout(legacyWorkout.id(),workoutEdit);
        verify(mockWorkoutRepo).findById(legacyWorkout.id());
        verify(mockWorkoutRepo).save(expected);
        assertEquals(expected,actual);
    }

    @Test
    void editWorkout_whenInvalidData_thenThrowException() {
        WorkoutEdit workoutEdit = WorkoutEdit.builder()
                .name("Changed workout")
                .day(testDate)
                .description("Changed description")
                .plan(List.of())
                .build();

        when(mockWorkoutRepo.findById(any(String.class))).thenThrow(NoSuchWorkoutException.class);
        assertThrows(NoSuchWorkoutException.class, () -> workoutService.editWorkout("invalidId",workoutEdit));
        verify(mockWorkoutRepo).findById("invalidId");
    }

    @Test
    void deleteWorkout() {
        String id = "1";
        workoutService.deleteWorkout(id);
        verify(mockWorkoutRepo).deleteById(id);
    }
}