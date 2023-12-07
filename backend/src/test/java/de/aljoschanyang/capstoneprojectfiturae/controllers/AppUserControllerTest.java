package de.aljoschanyang.capstoneprojectfiturae.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUserDetails;
import de.aljoschanyang.capstoneprojectfiturae.repositories.AppUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class AppUserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AppUserRepo appUserRepo;
    private static final String BASE_URI="/api/users";

    @Test
    @DirtiesContext
    void addUser_whenUserDetailsProvided_thenSaveAndReturnUser() throws Exception {
        AppUserDetails appUserDetails = new AppUserDetails("name","email","imgUrl");
        String userDetailsAsJson = objectMapper.writeValueAsString(appUserDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(appUserDetails.name()))
                .andExpect(jsonPath("$.email").value(appUserDetails.email()))
                .andExpect(jsonPath("$.imageUrl").value(appUserDetails.imageUrl()))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void addUser_whenNoUserDetailsProvided_thenSaveAndReturnUserWithNullDetails() throws Exception {
        AppUserDetails appUserDetails = new AppUserDetails(null,null,null);
        String userDetailsAsJson = objectMapper.writeValueAsString(appUserDetails);

        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDetailsAsJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").isEmpty())
                .andExpect(jsonPath("$.email").isEmpty())
                .andExpect(jsonPath("$.imageUrl").isEmpty())
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void getUserById_whenIdIsCorrect_thenReturnUser() throws Exception {
        AppUser appUser = AppUser.builder()
                .id("1")
                .name("Test")
                .email("email")
                .imageUrl("url")
                .build();
        appUserRepo.save(appUser);
        String appUserAsJson = objectMapper.writeValueAsString(appUser);

        mockMvc.perform(get(BASE_URI + "/" + appUser.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(appUserAsJson));
    }

    @Test
    void getUserById_whenIdIsIncorrect_thenThrowException() throws Exception {
        mockMvc.perform(get(BASE_URI + "/invalidId"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("The user is unknown"));
    }
}