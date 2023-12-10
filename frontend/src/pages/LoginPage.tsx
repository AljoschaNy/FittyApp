import {useNavigate} from "react-router-dom";
import "./LoginPage.css";
import GithubIcon from "../components/svg/GithubIcon.tsx";

function LoginPage() {
    const navigate = useNavigate();
    function login(){
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self");
    }

    return (
        <div className={"main-wrapper"}>
            <div className={"login-page"}>
                <h1>FITURAE</h1>
                <button className={"icon"} onClick={login}>
                    <GithubIcon />
                    <p>Login with GitHub</p>
                </button>
                <button className={"icon login-page-home"} onClick={() => navigate("/")}>HOME</button>
            </div>
        </div>


    )
}

export default LoginPage;