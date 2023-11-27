import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import {HomeProps, Workout} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";

function HomePage({userId, workouts}:Readonly<HomeProps>) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("User")

    useEffect(() => {
        axios.get(`/api/users/${userId}`)
            .then(response => setUserName(response.data.name))
    });

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
                        <button onClick={() => navigate(`/workout/${workout.id}`)}>Details</button>

                    </div>
                )
            })}
            <button className={"btn-bottom-center-fixed"} onClick={() => navigate("/workout/add")}>Add workout</button>
        </>

    )
}

export default HomePage;