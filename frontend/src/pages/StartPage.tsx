import {useNavigate} from "react-router-dom";
import "./StartPage.css";

function StartPage () {
    const navigate = useNavigate();

    return (
        <>
            <header className={"header-start"}>
                <p className={"logo"}>Fiturae</p>
                <button className={"header-btn-login"} onClick={() => navigate("/home")}>Login</button>
            </header>
            <main>
                <section className={"banner"}>
                    <p>Deine Fitness.</p>
                    <p>Deine Kontrolle.</p>
                    <p>Dein Erfolg.</p>
                </section>
                <div className={"center"}>
                    <button className={"get-started"} onClick={() => navigate("/home")}>GET STARTED</button>
                </div>

            </main>
        </>
    )
}

export default StartPage;