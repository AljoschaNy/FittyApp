import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoutes from "./components/security/ProtectedRoutes.tsx";
import SecuredComponent from "./components/security/SecuredComponent.tsx";
import StartPage from "./pages/StartPage.tsx";


export type AppUser = {
    id: string,
    name: string,
    imageUrl: string
}
function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(r => {
                setIsLoading(true);
                setAppUser(r.data)
            })
            .catch(e => console.log(e))
    }, []);

    if(appUser) {
        setIsLoading(false)
    }

    return (
        <>
            <Routes>
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/"} element={<StartPage />} />
                {!isLoading && <Route element={<ProtectedRoutes appUser={appUser}/>}>
                    <Route path={"/home"} element={<SecuredComponent/>}/>

                </Route>}

            </Routes>
        </>
    )
}

export default App
