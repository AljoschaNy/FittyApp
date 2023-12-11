import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoutes from "./components/security/ProtectedRoutes.tsx";
import StartPage from "./pages/StartPage.tsx";
import HomeWithWorkouts from "./components/state/HomeWithWorkouts.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import AddPageWithWorkouts from "./components/state/AddPageWithWorkouts.tsx";
import EditPageWithWorkouts from "./components/state/EditPageWithWorkouts.tsx";
import {AppUser} from "./types/types.ts";
import ProfilePageWithWorkouts from "./components/state/ProfilePageWithWorkouts.tsx";
import Loader from "./components/animation/Loader.tsx";

function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(response => {
                if(response.data) {
                    setIsLoading(false);
                    setAppUser(response.data)
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error)
            })
    }, []);

    if(isLoading) {
        return (
            <div className={"page-center"}>
                <Loader />
            </div>
        )
    }

    return (
        <Routes>
            <Route path={"/"} element={<StartPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route element={<ProtectedRoutes appUser={appUser}/>}>
                <Route path={"/home"} element={appUser && <HomeWithWorkouts userId={appUser.id} userName={appUser.name} imageUrl={appUser.imageUrl}/>}/>
                <Route path={"/workout/add"} element={appUser && <AddPageWithWorkouts userId={appUser.id}/>}/>
                <Route path={"/workout/:id/edit"} element={appUser && <EditPageWithWorkouts userId={appUser.id}/>}/>
                <Route path={"/workout/:id"} element={<DetailsPage/>}/>
                <Route path={"/profile"} element={appUser && <ProfilePageWithWorkouts appUser={appUser} />} />
            </Route>
        </Routes>
    )
}

export default App
