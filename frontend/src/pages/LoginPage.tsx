import {useNavigate} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    function login(){
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    return (
        <>
            <button onClick={login}>Login with GitHub</button>
            <button onClick={() => navigate("/")}>Back to Home</button>
        </>
    )
}

export default LoginPage;