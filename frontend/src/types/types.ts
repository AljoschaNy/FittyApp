import React from "react";

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

export type HomeProps = {
    userName: string | undefined
}

export type AddPageProps = {
    userId: string
}

export type DetailsPageProps = {
    onWorkoutChange: () => void
}

export type EditPageProps = {
    onWorkoutChange: () => void
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
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
}

// State types
export type WorkoutContextType = {
    workouts: Workout[],
    setWorkouts: (value: Workout[]) => void,
    fetchWorkouts: () => void
}

export type WorkoutProviderProps = {
    children: React.ReactNode;
    userId: string
}