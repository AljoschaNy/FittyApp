package de.aljoschanyang.capstoneprojectfiturae.controllers;

import de.aljoschanyang.capstoneprojectfiturae.models.AppUser;
import de.aljoschanyang.capstoneprojectfiturae.services.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class AppUserController {
    private AppUserService appUserService;

    @PostMapping("")
    public AppUser addUser(@RequestBody AppUser appUser) {
        return appUserService.addUser(appUser);
    }

    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable String id) {
        return appUserService.getUserById(id);
    }
}
