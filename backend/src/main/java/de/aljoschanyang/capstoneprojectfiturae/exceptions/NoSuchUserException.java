package de.aljoschanyang.capstoneprojectfiturae.exceptions;

public class NoSuchUserException extends RuntimeException{
    public NoSuchUserException() {
        super("The user is unknown");
    }

    public NoSuchUserException(String message) {
        super(message);
    }
}
