import {Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {User, Workout} from "./types/types.ts";
import axios, {AxiosResponse} from "axios";
import DetailsPage from "./pages/DetailsPage.tsx";

function App() {
    const [user, setUser] = useState<User>({id:"", name: ""});
    const [isRegisteredUser, setIsRegisteredUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [error, setError] = useState("");

    function fetchWorkouts() {
        axios.get(`api/workouts/${user.id}`)
            .then((response:AxiosResponse<Workout[]>) => {
                setWorkouts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
                setError("Fehler beim Abrufen des Workouts.");
                setIsLoading(false);
            })
    }


    useEffect(() => {
        const userId = "655b5b283f332f4fcfbf02c0";
        axios.get('api/users/' + userId)
            .then((response:AxiosResponse<User>) => {
                setUser(response.data);
                setIsRegisteredUser(true);
            })
            .catch(error => console.error(error.message))
    }, []);

    useEffect(() => {
        if(isRegisteredUser) {
            fetchWorkouts();
        }
    }, [isRegisteredUser]);

    if(isLoading) {
        return <p> Is loading</p>
    }

    if(error) {
        return <p>{error}</p>
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<HomePage userName={user.name} workouts={workouts} />} />
                <Route path={"/workout/add"} element={<AddPage userId={user.id} onWorkoutChange={fetchWorkouts}/>} />
                <Route path={"/workout/:id"} element={<DetailsPage />} />
            </Routes>
        </>
    )
}

export default App
