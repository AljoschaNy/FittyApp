import {Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {User, Workout} from "./types/types.ts";
import axios from "axios";
import DetailsPage from "./pages/DetailsPage.tsx";
import EditPage from "./pages/EditPage.tsx";

function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isFetchingWorkouts, setIsFetchingWorkouts] = useState(true);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [user, setUser] = useState<User>();
    const [username, setUsername] = useState("");
    const userId = "655b5b283f332f4fcfbf02c0";

    function login() {
        const host= window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github" , "_self")
    }

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(response => setUsername(response.data))
            .catch(error => console.log(error))
    }, []);

    function fetchWorkoutsByUser() {
        user && axios.get(`/api/workouts/${user.id}`)
            .then((response) => {
                setWorkouts(response.data);
                setIsFetchingWorkouts(false);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
            });
    }

    function fetchUserDetails() {
        axios.get(`/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
                setIsFetchingUser(false);
            })
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        fetchWorkoutsByUser();
    }, [isFetchingUser]);

    if(isFetchingWorkouts) {
        return <p></p>
    }

    return (
        <>
            <button onClick={login}>Login to Github</button>
            {username && <h2>{username}</h2>}
            <Routes>

                <Route path={"/home"} element={<HomePage userName={user?.name} workouts={workouts} />} />
                <Route path={"/workout/add"} element={<AddPage userId={userId} onWorkoutChange={fetchWorkoutsByUser}/>} />
                <Route path={"/workout/:id"} element={<DetailsPage />} />
                <Route path={"/workout/:id/edit"} element={<EditPage onWorkoutChange={fetchWorkoutsByUser} />} />
            </Routes>
            <div className={"position-fix-bottom"}></div>
        </>
    )
}

export default App
