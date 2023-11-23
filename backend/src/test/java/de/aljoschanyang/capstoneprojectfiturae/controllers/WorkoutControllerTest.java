package de.aljoschanyang.capstoneprojectfiturae.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.aljoschanyang.capstoneprojectfiturae.models.User;
import de.aljoschanyang.capstoneprojectfiturae.models.WeekDay;
import de.aljoschanyang.capstoneprojectfiturae.models.WorkoutDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class WorkoutControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ObjectMapper objectMapper;

    private static final String BASE_URI = "/api/workouts";

    @Test
    @DirtiesContext
    void addWorkout_withValidData_thenExpectSuccess() throws Exception {
        User validUser = new User("validUserId", "User1");
        userRepo.save(validUser);

        WorkoutDetailsDTO workoutDetails = WorkoutDetailsDTO.builder()
                .userId("validUserId")
                .workoutName("Test Workout")
                .workoutDay(WeekDay.MONDAY)
                .description("Test description")
                .plan(List.of())
                .build();
        String workoutDetailsAsJson = objectMapper.writeValueAsString(workoutDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(workoutDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.workoutName").value(workoutDetails.workoutName()))
                .andExpect(jsonPath("$.workoutDay").value(workoutDetails.workoutDay().toString()))
                .andExpect(jsonPath("$.description").value(workoutDetails.description()));
    }

    @Test
    @DirtiesContext
    void addWorkout_withInvalidData_thenExpectUserNotFoundException() throws Exception {
        WorkoutDetailsDTO workoutDetails = WorkoutDetailsDTO.builder()
                .userId("invalidUserId")
                .workoutName("Test Workout")
                .workoutDay(WeekDay.MONDAY)
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
}