import {Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {Workout} from "./types/types.ts";
import axios from "axios";
import DetailsPage from "./pages/DetailsPage.tsx";
import EditPage from "./pages/EditPage.tsx";

function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIslLoading] = useState(true);

    function fetchWorkouts() {
        axios.get(`/api/workouts`)
            .then((response) => {
                setWorkouts(response.data);
                setIslLoading(false);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
            });
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    if(isLoading) {
        return <p></p>
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<HomePage userId={workouts[0].userId} workouts={workouts} />} />
                <Route path={"/workout/add"} element={<AddPage userId={workouts[0].userId} onWorkoutChange={fetchWorkouts}/>} />
                <Route path={"/workout/:id"} element={<DetailsPage />} />
                <Route path={"/workout/:id/edit"} element={<EditPage onWorkoutChange={fetchWorkouts} />} />
            </Routes>
        </>
    )
}

export default App
