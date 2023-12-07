import {WorkoutContextType} from "../../types/types.ts";
import {createContext} from "react";

const defaultContextValue: WorkoutContextType = {
    workouts: [],
    setWorkouts: () => {},
    fetchWorkouts: () => {}
}

export const WorkoutContext = createContext<WorkoutContextType>(defaultContextValue);