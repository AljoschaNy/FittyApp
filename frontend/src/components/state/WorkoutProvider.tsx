import {Workout, WorkoutProviderProps} from "../../types/types.ts";
import {useState} from "react";
import {WorkoutContext} from "./WorkoutContext.tsx";

function WorkoutProvider({children}:Readonly<WorkoutProviderProps>) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    return (
        <WorkoutContext.Provider value={{ workouts, setWorkouts }} >
            {children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;