import {Workout, WorkoutProviderProps} from "../../types/types.ts";
import {useEffect, useState} from "react";
import {WorkoutContext} from "./WorkoutContext.tsx";
import axios from "axios";

function WorkoutProvider({ children, userId }:Readonly<WorkoutProviderProps>) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isFetchingWorkouts, setIsFetchingWorkouts] = useState(true);

    useEffect(() => {
        axios.get(`/api/workouts/${userId}`)
            .then((response) => {
                setWorkouts(response.data);
                setIsFetchingWorkouts(false);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
            });
    }, [userId]);


    if(isFetchingWorkouts) {
        return <div>Loading...</div>
    }

    return (
        <WorkoutContext.Provider value={{ workouts, setWorkouts }} >
            {children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;