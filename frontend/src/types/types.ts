export type WorkoutExercise = {
    name: string,
    setCount: number,
    repsPerSet: number,
    weightInKg: number;
    breakInSec: number
}

export type Workout = {
    id: string,
    userId: string,
    workoutName: string,
    workoutDay: string,
    description: string,
    plan: WorkoutExercise[]
}

export type WorkoutNoId = {
    userId: string,
    workoutName: string,
    workoutDay: string,
    description: string,
    plan: WorkoutExercise[]
}

export type User = {
    id: string,
    name: string
}

export type HomeProps = {
    userName: string,
    workouts: Workout[]
}

export type AddPageProps = {
    userId: string,
    onWorkoutChange: () => void
}