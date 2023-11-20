package de.aljoschanyang.capstoneprojectfiturae.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.aljoschanyang.capstoneprojectfiturae.models.UserDetailsDTO;
import de.aljoschanyang.capstoneprojectfiturae.repositories.UserRepo;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
        UserDetailsDTO userDetails = new UserDetailsDTO("TestName");
        String userDetailsAsJson = objectMapper.writeValueAsString(userDetails);

        mockMvc.perform(post(BASE_URI)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(userDetails.name()))
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

    @Test
    @DirtiesContext
    void getUserById_whenIdIsCorrect_thenReturnUser() throws Exception {
        UserDetailsDTO userDetails = new UserDetailsDTO("TestName");
        String userDetailsAsJson = objectMapper.writeValueAsString(userDetails);

        MvcResult result = mockMvc.perform(post(BASE_URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andReturn();
        String responseString = result.getResponse().getContentAsString();
        JSONObject responseObj = new JSONObject(responseString);
        String userId = responseObj.getString("id");

        mockMvc.perform(get(BASE_URI + "/" + userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId))
                .andExpect(jsonPath("$.name").value(userDetails.name()));
    }

    @Test
    void getUserById_whenIdIsIncorrect_thenThrowException() throws Exception {
        mockMvc.perform(get(BASE_URI + "/invalidId"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The user is unknown"));
    }
}