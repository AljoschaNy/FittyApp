export type WorkoutExercise = {
    name: string,
    setCount: number,
    repsPerSet: number,
    weightInKg: number;
    breakInSec: number
}

export type Workout = {
    userId: string,
    workoutName: string,
    workoutDay: string,
    description: string,
    plan: WorkoutExercise[]
}