import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import {HomeProps, Workout} from "../types/types.ts";
import RightArrow from "../components/svg/RightArrow.tsx";
import {useContext} from "react";
import {WorkoutContext} from "../components/state/WorkoutContext.tsx";

function HomePage({userName}:Readonly<HomeProps>) {
    const navigate = useNavigate();
    const {workouts} = useContext(WorkoutContext);

    function handleClick(id:string) {
        navigate(`/workout/${id}`);
    }

    return(
        <>
            <header className={"header-home"}>
                <div className={"header-home-bg"}></div>
                <div className={"header-greeting"}>
                    <img
                        src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className={"profile-pic"}
                        alt={"profile picture"}
                    />
                    <p>Hey, <span className={"bold"}>{userName ?? "User"}!</span></p>
                </div>
                <div className={"test"}></div>
            </header>
            <div className={"position-fix-home"}></div>
            <div className={"main-wrapper"}>
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
            <div className={"footer-single-child"}>
                <button className={"btn-regular btn-add-workout"} onClick={() => navigate("/workout/add")}>+</button>
            </div>
        </>
    )
}

export default HomePage;
