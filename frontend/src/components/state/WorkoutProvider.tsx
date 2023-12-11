import {Workout, WorkoutProviderProps} from "../../types/types.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {WorkoutContext} from "./WorkoutContext.tsx";
import axios from "axios";
import Loader from "../animation/Loader.tsx";

function WorkoutProvider({ children, userId }:Readonly<WorkoutProviderProps>) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isFetchingWorkouts, setIsFetchingWorkouts] = useState(true);

    const fetchWorkouts = useCallback(function (){
        setIsFetchingWorkouts(true);
        axios.get(`/api/workouts/${userId}`)
            .then((response) => {
                setWorkouts(response.data);
                setIsFetchingWorkouts(false);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
                setIsFetchingWorkouts(false);
            });
    },[userId]);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    const contextValue = useMemo(() => ({
        workouts,
        setWorkouts,
        fetchWorkouts
    }), [workouts,setWorkouts,fetchWorkouts]);

    if(isFetchingWorkouts) {
        return (
            <div className={"page-center"}>
                <Loader />
            </div>
        );
    }

    return (
        <WorkoutContext.Provider value={contextValue} >
            {children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
