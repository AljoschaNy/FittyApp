import "./ProfilePage.css";
import HomeIcon from "../components/svg/HomeIcon.tsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {WorkoutContext} from "../components/state/WorkoutContext.tsx";
import Logout from "../components/svg/Logout.tsx";
import {ProfilePageProps} from "../types/types.ts";

function ProfilePage({ appUser }: Readonly<ProfilePageProps>) {
    const navigate = useNavigate();
    const {workouts} = useContext(WorkoutContext);

    function logout(){
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/logout", "_self");
    }

    return(
        <div className={"main-wrapper profile-page"}>
            <button className={"icon btn-logout"} type={"button"} onClick={logout}>
                <Logout />
            </button>
            <div className={"profile-pic-section"}>
                <img className={"profile-pic-lg"} src={appUser.imageUrl} alt={"user avatar"} />
            </div>
            <div className={"profile-page-details"}>
                <h2>{appUser.name}</h2>
                <section className={"workout-stats"}>
                    <p>Workouts: <span className={"workout-stats-count"}>{workouts.length}</span></p>
                </section>
                <div className={"footer-single-child"}>
                    <button className={"icon"} onClick={() => navigate("/home")}>
                        <HomeIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
