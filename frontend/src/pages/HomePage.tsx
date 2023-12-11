import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import {HomeProps, Workout} from "../types/types.ts";
import RightArrow from "../components/svg/RightArrow.tsx";
import {useContext} from "react";
import {WorkoutContext} from "../components/state/WorkoutContext.tsx";
import ProfileIcon from "../components/svg/ProfileIcon.tsx";
import PlusIcon from "../components/svg/PlusIcon.tsx";

function HomePage({userName, imageUrl}:Readonly<HomeProps>) {
    const navigate = useNavigate();
    const {workouts} = useContext(WorkoutContext);

    function handleClick(id:string) {
        navigate(`/workout/${id}`);
    }

    return(
        <>
            <div className={"full-width-container"}>
                <header className={"header-home"}>
                    <div className={"header-home-bg"}></div>
                    <div className={"header-greeting"}>
                        <img
                            src={imageUrl}
                            className={"profile-pic"}
                            alt={"profile picture"}
                        />
                        <div className={"header-home-profile"}>
                            <p>Hey <span className={"bold"}>{userName ?? "User"}</span></p>
                            <button className={"btn-home-header-profile"} onClick={() => navigate("/profile")}>
                                <ProfileIcon/>
                            </button>
                        </div>
                    </div>
                    <div className={"test"}></div>
                </header>
            </div>
            <div className={"position-fix-home"}></div>
            <div className={"main-wrapper"}>
                <div className={"main-wrapper-home"}>
                    <h2 className={"home-title"}>Recent Workouts</h2>
                    {workouts.map((workout:Workout) => {
                        return(
                            <div key={workout.id} className={"workout-card"}>
                                <div className={"workout-card-head"}>
                                    <h3>{workout.name}</h3>
                                    <p>{workout.day}</p>
                                </div>
                                <div className={"workout-card-body"}>
                                    <p>{workout.description}</p>
                                    <p>{workout.plan.length} Exercise(s)</p>
                                </div>
                                <button
                                    className={"icon-bottom-right btn-details"}
                                    onClick={() => workout.id && handleClick(workout.id)}
                                    onKeyDown={(event) => {
                                        if(event.key === "Enter") {
                                            workout.id && handleClick(workout.id);
                                        }
                                    }}
                                    aria-labelledby={`workoutName-${workout.id}`}
                                >
                                    <RightArrow />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <footer className={"footer-home-container"}>
                <div className={"footer-home"}>
                    <button className={"btn-home-page btn-home-page-add"} onClick={() => navigate("/workout/add")}>
                        <PlusIcon />
                    </button>
                    <button className={"btn-home-page btn-home-page-profile"} onClick={() => navigate("/profile")}>
                        <ProfileIcon/>
                    </button>
                </div>
                <div className={"footer-single-child"}>
                    <button className={"btn-bottom-center-fixed btn-regular"} onClick={() => navigate("/workout/add")}>+</button>
                </div>

            </footer>
            <div className={"position-fix-bottom"}></div>
        </>
    )
}

export default HomePage;
