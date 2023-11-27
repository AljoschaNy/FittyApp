package de.aljoschanyang.capstoneprojectfiturae.models;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@Document(collection = "users")
public record AppUser(
        @Id
        String id,
        @Field("user_name")
        String name
) {
}
