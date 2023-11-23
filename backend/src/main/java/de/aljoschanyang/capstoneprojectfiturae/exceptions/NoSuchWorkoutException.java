package de.aljoschanyang.capstoneprojectfiturae.exceptions;

public class NoSuchWorkoutException extends RuntimeException{
    public NoSuchWorkoutException() {
        super("The workout is unknown");
    }

    public NoSuchWorkoutException(String message) {
        super(message);
    }
}
