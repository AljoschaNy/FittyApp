package de.aljoschanyang.capstoneprojectfiturae.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.aljoschanyang.capstoneprojectfiturae.models.UserDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ObjectMapper objectMapper;

    private static final String BASE_URI="/api/users";

    @Test
    @DirtiesContext
    void addUser_whenUserWithName_thenExpectNameMatchesInput() throws Exception {
        UserDetailsDTO userDetails = new UserDetailsDTO("Test");
        String userDetailsAsJson = objectMapper.writeValueAsString(userDetails);

        mockMvc.perform(post(BASE_URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test"))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void addUser_whenNoNameProvided_thenExpectEmptyName() throws Exception {
        UserDetailsDTO userDetails = new UserDetailsDTO(null);
        String userDetailsAsJson = objectMapper.writeValueAsString(userDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").isEmpty())
                .andExpect(jsonPath("$.id").exists());
    }
}