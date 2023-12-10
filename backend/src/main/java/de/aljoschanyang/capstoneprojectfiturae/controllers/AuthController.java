package de.aljoschanyang.capstoneprojectfiturae.controllers;

import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.models.AppUserDetails;
import de.aljoschanyang.capstoneprojectfiturae.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppUserService appUserService;

    @GetMapping("/me")
    public AppUser getMe () {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof DefaultOAuth2User defaultOAuth2User) {

            AppUserDetails appUserDetails = AppUserDetails.builder()
                    .id("github" + defaultOAuth2User.getAttributes().get("id").toString())
                    .name(defaultOAuth2User.getAttributes().get("login").toString())
                    .imageUrl(defaultOAuth2User.getAttributes().get("avatar_url").toString())
                    .build();

            return appUserService.addUser(appUserDetails);
        }

        throw new IllegalArgumentException("No user logged in");
    }
}
