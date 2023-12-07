package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;

@Builder
public record AppUserDetails(
        String name,
        String email,
        String imageUrl
) {
}
