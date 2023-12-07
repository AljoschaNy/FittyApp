import {useEffect, useState} from "react";
import axios from "axios";


type AppUser = {
    id: string,
    name: string,
    imageUrl: string
}
function App() {
    const [appUser, setAppUser] = useState<AppUser | null>(null);

    function login(){
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    function logout() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/logout", "_self");
    }

    useEffect(() => {
        axios.get("/api/auth/me")
            .then(r => setAppUser(r.data))
            .catch(e => console.log(e))
    }, []);

    return (
        <>
            {!appUser && <button onClick={login}>Login with Github</button>}
            {
                appUser && (
                    <>
                        <h3>{appUser.name}</h3>
                        <img src={appUser.imageUrl} alt={"avatar"}/>
                        <button onClick={logout}>Logout</button>
                    </>
                )
            }
        </>
    )
}

export default App
