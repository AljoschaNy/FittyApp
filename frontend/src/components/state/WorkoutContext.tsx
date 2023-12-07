import {WorkoutContextType} from "../../types/types.ts";
import {createContext} from "react";

const defaultContextValue: WorkoutContextType = {
    workouts: [],
    setWorkouts: () => {}
}

export const WorkoutContext = createContext<WorkoutContextType>(defaultContextValue);