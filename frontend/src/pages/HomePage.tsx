import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import {Workout} from "../types/types.ts";

type Props = {
    userName: string,
    workouts: Workout[],
}

function HomePage({userName, workouts}:Props) {
    const navigate = useNavigate();

    return(
        <>
            <header className={"header-home"}>
                <div className={"header-home-bg"}></div>
                <div className={"header-greeting"}>
                    <div className={"profile-pic"}></div>
                    <p>Hey, <span className={"bold"}>{userName}!</span></p>
                </div>

            </header>
            <div className={"position-fix-home"}></div>
            <h2>Recent Workouts</h2>
            {workouts.map((workout:Workout, index) => {
                return(
                    <div key={index} className={"workout-card"}>
                        <div className={"workout-card-head"}>
                            <h3>{workout.workoutName}</h3>
                            <p>{workout.workoutDay}</p>
                        </div>
                        <div className={"workout-card-body"}>
                            <p>{workout.description}</p>
                            <p>{workout.plan.length} Exercise(s)</p>
                        </div>

                    </div>
                )
            })}
            <button className={"btn-add-workout"} onClick={() => navigate("/workout/add")}>Add workout</button>
        </>

    )
}

export default HomePage;