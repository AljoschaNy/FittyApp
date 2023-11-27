import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import {HomeProps, Workout} from "../types/types.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import RightArrow from "../components/svg/RightArrow.tsx";

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
                    <img
                        src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className={"profile-pic"}
                    />
                    <p>Hey, <span className={"bold"}>{userName}!</span></p>
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
                            <div
                                onClick={() => navigate(`/workout/${workout.id}`)}
                                className={"icon-bottom-right"}
                            >
                                <RightArrow />
                            </div>

                            {/*<button className={"btn-bottom-right"} onClick={() => navigate(`/workout/${workout.id}`)}>Details</button>*/}

                        </div>
                    )
                })}
            </div>
            <button className={"btn-bottom-center-fixed"} onClick={() => navigate("/workout/add")}>Add workout</button>
        </>

    )
}

export default HomePage;