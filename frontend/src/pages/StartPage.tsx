import {useNavigate} from "react-router-dom";
import "./StartPage.css";

function StartPage () {
    const navigate = useNavigate();

    return (
        <div className={"start-main-container"}>
            <header className={"header-start"}>
                <img className={"logo"} src={"/logo2.png"} alt={"logo"}/>
                <button className={"header-btn-login"} onClick={() => navigate("/home")}>Login</button>
            </header>
            <main className={"main-start"}>
                <section className={"banner"}>
                    <div className={"banner-video-section"}>
                        <video className={"banner-video"} src={"/banner-video.mp4"} autoPlay loop muted />
                        <div className={"video-overlay"}></div>
                    </div>
                    <div className={"banner-text"}>
                        <h2>Deine Fitness.</h2>
                        <h2>Deine Kontrolle.</h2>
                        <h2>Dein Erfolg.</h2>
                        <button className={"get-started"} onClick={() => navigate("/home")}>GET STARTED</button>
                    </div>
                </section>
                <div className={"center"}>
                </div>

            </main>
        </div>
    )
}

export default StartPage;