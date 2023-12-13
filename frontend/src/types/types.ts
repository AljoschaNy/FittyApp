import React from "react";

// Model Types
export type AppUser = {
    id: string,
    name: string,
    imageUrl: string
}

export type Workout = {
    id?: string,
    userId: string,
    name: string,
    day: string,
    description: string,
    plan: WorkoutExercise[]
}

export type WorkoutNoId = {
    userId: string,
    name: string,
    day: string,
    description: string,
    plan: WorkoutExercise[]
}

export type WorkoutExercise = {
    id: number,
    name: string,
    setCount: number,
    repsPerSet: number,
    weightInKg: number;
    breakInSec: number
}

export type User = {
    id: string,
    name: string
}

// Page Types
export type ProfilePageProps = {
    appUser: AppUser
}

export type HomeProps = {
    userName: string | undefined,
    imageUrl: string
}

export type AddPageProps = {
    userId: string
}

// Component Types
export type WorkoutCardProps = {
    workout: Workout
}

export type WorkoutFormType = {
    formType: "new" | "edit",
    initialWorkout: Workout
}

export type HeaderPagesProps = {
    pageTitle: string
}

export type FooterFormPagesType = {
    cancelDestination: string,
    formId: string
}

export type TextInputType = {
    name: string,
    value: string,
    placeholder?: string,
    maxLength?:number,
    required?: boolean,
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
}

// State Types
export type WorkoutContextType = {
    workouts: Workout[],
    setWorkouts: (value: Workout[]) => void,
    fetchWorkouts: () => void
}

export type HomeWithWorkoutsProps = {
    userId: string,
    userName: string | undefined,
    imageUrl: string
}

export type WorkoutProviderProps = {
    children: React.ReactNode;
    userId: string
}

export type ModifyPageWithWorkoutsProps = {
    userId: string
}

export type ProfilePageWithWorkoutsProps = {
    appUser: AppUser
}
