import "./DetailsPage.css";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Workout} from "../types/types.ts";

function DetailsPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [workout, setWorkout] = useState<Workout>();
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

    function fetWorkoutDetails() {
        axios.get(`../api/workouts/details/${id}`)
            .then((response: AxiosResponse<Workout>):void => {
                setWorkout(response.data);
                setIsLoading(false);
                if(location.state?.updated){
                    location.state.updated = false;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(true);
            });
    }

    useEffect(():void => {
        fetWorkoutDetails()
    },[location.state?.updated]);

    if (isLoading) {
        return (
            <section className={"page-state"} >
                <p>Loading...</p>
            </section>
        )
    }

    if(error || !workout) {
        return (
            <section className={"page-state"}>
                <p>
                    <span>Oops!</span> This ID seems to be an invalid workout. <br/>
                    Looks like you've just attempted a '404 lift' – a
                    mysterious exercise only found in the deep web gym. <br />
                    For an actual workout, please jog back to the <Link to={"/"} >homepage</Link>!
                </p>
            </section>
        );
    }

    return (
        <>
            <HeaderPages pageTitle={"Details"} />
            <p>{workout.workoutName}</p>
            <p>{workout.description}</p>
            <p>{workout.workoutDay}</p>
            <fieldset>
                <legend>Exercises</legend>
                {workout.plan.map((exercise,index) => (
                    <div key={index+" " + workout.id} className={"workout-exercise-card"}>
                        <p>{exercise.name}</p>
                        <div className={"exercise-details"}>
                            <p>Sets: {exercise.setCount}</p>
                            <p>Reps: {exercise.repsPerSet}</p>
                            <p>Weight in kg: {exercise.weightInKg}</p>
                            <p>Break in sec: {exercise.breakInSec}</p>
                        </div>
                    </div>
                ))}
            </fieldset>
            <button  className={"btn-top-right-fixed"} onClick={() => navigate(
                `/workout/${workout?.id}/edit`,
                {state:{workout:workout}}
            )}>Edit</button>
            <button className={"btn-bottom-center-fixed"} onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default DetailsPage;