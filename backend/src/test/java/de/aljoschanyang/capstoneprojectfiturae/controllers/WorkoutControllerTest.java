package de.aljoschanyang.capstoneprojectfiturae.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.aljoschanyang.capstoneprojectfiturae.models.*;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import de.aljoschanyang.capstoneprojectfiturae.repositories.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class WorkoutControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private AppUserRepo appUserRepo;
    @Autowired
    private WorkoutRepo workoutRepo;
    @Autowired
    private ObjectMapper objectMapper;

    private static final String BASE_URI = "/api/workouts";

    @Test
    @DirtiesContext
    void addWorkout_whenUserExistsInDb_thenReturnWorkout() throws Exception {
        AppUser validAppUser = new AppUser("validUserId", "User1");
        appUserRepo.save(validAppUser);

        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId("validUserId")
                .name("Test Workout")
                .day(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();
        String workoutDetailsAsJson = objectMapper.writeValueAsString(workoutDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value(workoutDetails.name()))
                .andExpect(jsonPath("$.day").value(workoutDetails.day().toString()))
                .andExpect(jsonPath("$.description").value(workoutDetails.description()));
    }

    @Test
    @DirtiesContext
    void addWorkout_whenUserDoesNotExistInDb_thenThrowException() throws Exception {
        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId("invalidUserId")
                .name("Test Workout")
                .day(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();
        String workoutDetailsAsJson = objectMapper.writeValueAsString(workoutDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutDetailsAsJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The user is unknown"));
    }

    @Test
    @DirtiesContext
    void getAllWorkoutsByUserId_whenUserExists_thenReturnWorkouts() throws Exception {
        AppUser validAppUser = new AppUser("validUserId", "User1");
        appUserRepo.save(validAppUser);

        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId(validAppUser.id())
                .name("Test Workout")
                .day(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();
        String workoutDetailsAsJson = objectMapper.writeValueAsString(workoutDetails);

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutDetailsAsJson))
                        .andExpect(status().isOk())
                        .andReturn();
        String jsonResponse = result.getResponse().getContentAsString();
        Workout workout = objectMapper.readValue(jsonResponse, Workout.class);

        List<Workout> expected = List.of(workout);
        String expectedAsJson = objectMapper.writeValueAsString(expected);

        mockMvc.perform(get(BASE_URI + "/" + validAppUser.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAsJson));
    }

    @Test
    void getAllWorkoutsByUserId_whenUserDoesNotExist_thenThrowException() throws Exception {
        String invalidUserId = "invalidUserId";

        mockMvc.perform(get(BASE_URI + "/" + invalidUserId))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The user is unknown"));
    }

    @Test
    @DirtiesContext
    void getWorkoutById_whenIdIsValid_thenReturnWorkout() throws Exception {
        AppUser validAppUser = new AppUser("validUserId", "User1");
        appUserRepo.save(validAppUser);

        WorkoutDetails workoutDetails = WorkoutDetails.builder()
                .userId(validAppUser.id())
                .name("Test Workout")
                .day(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();
        String workoutDetailsAsJson = objectMapper.writeValueAsString(workoutDetails);

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutDetailsAsJson))
                .andExpect(status().isOk())
                .andReturn();
        String jsonResponse = result.getResponse().getContentAsString();
        Workout workout = objectMapper.readValue(jsonResponse, Workout.class);
        String workoutAsJson = objectMapper.writeValueAsString(workout);

        mockMvc.perform(get(BASE_URI + "/details/" + workout.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(workoutAsJson));
    }

    @Test
    void getWorkoutById_whenIdIsInvalid_thenThrowException() throws Exception {
        String invalidId = "invalidId";

        mockMvc.perform(get(BASE_URI + "/details/" + invalidId))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The workout is unknown"));
    }

    @Test
    void editWorkout_whenValidData_thenReturnWorkout() throws Exception {
        Workout workoutBefore = Workout.builder()
                .id("1")
                .userId("User1")
                .name("Test Workout")
                .day(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();

        WorkoutEdit workoutEdit = WorkoutEdit.builder()
                .name("Changed Workout")
                .day(WeekDay.FRIDAY)
                .description("Changed description")
                .plan(List.of())
                .build();

        Workout expected = Workout.builder()
                .id("1")
                .userId("User1")
                .name(workoutEdit.name())
                .day(workoutEdit.day())
                .description(workoutEdit.description())
                .plan(workoutEdit.plan())
                .build();

        String expectedAsJson = objectMapper.writeValueAsString(expected);
        String workoutEditAsJson = objectMapper.writeValueAsString(workoutEdit);
        workoutRepo.save(workoutBefore);

        mockMvc.perform(put(BASE_URI + "/" + workoutBefore.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutEditAsJson))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAsJson));
    }

    @Test
    void editWorkout_whenInvalidData_thenThrowException() throws Exception {
        WorkoutEdit workoutEdit = WorkoutEdit.builder()
                .name("Changed Workout")
                .day(WeekDay.FRIDAY)
                .description("Changed description")
                .plan(List.of())
                .build();

        String workoutEditAsJson = objectMapper.writeValueAsString(workoutEdit);
        mockMvc.perform(put(BASE_URI + "/invalidId")
                .contentType(MediaType.APPLICATION_JSON)
                .content(workoutEditAsJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The workout is unknown"));
    }
}