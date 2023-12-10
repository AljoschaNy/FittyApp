import "./DetailsPage.css";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Workout} from "../types/types.ts";
import EditIcon from "../components/svg/EditIcon.tsx";
import HomeIcon from "../components/svg/HomeIcon.tsx";

function DetailsPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [workout, setWorkout] = useState<Workout>();
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleExerciseIds, setVisibleExerciseIds] = useState<number[]>([]);

    function fetchWorkoutDetails() {
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
        fetchWorkoutDetails()
    },[location.state?.updated]);

    if (isLoading) {
        return (
            <section className={"page-state"} >
                <p></p>
            </section>
        )
    }

    function toggleDetails(exerciseId:number) {
        if(visibleExerciseIds.includes(exerciseId)) {
            setVisibleExerciseIds(visibleExerciseIds.filter(id => id !== exerciseId));
        } else {
            setVisibleExerciseIds([...visibleExerciseIds, exerciseId]);
        }
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
            <div className={"main-wrapper workout-details"}>
                <p className={"details-field"}>{workout.name}</p><br/>
                <p className={"details-field"}>{workout.description}</p><br/>
                <p className={"details-field"}>{workout.day}</p><br/>
                <h3 className={"exercises-title"}>Exercises</h3>
                    {workout.plan.map((exercise,index) => {
                        const exerciseId = index+1;

                        return (
                                <button
                                    key={exerciseId}
                                    className={"workout-exercise-card "}
                                    onClick={() => toggleDetails(exerciseId)}
                                >
                                    <p className={"exercise-details-name"}>{exercise.name}</p>
                                    {visibleExerciseIds.includes(exerciseId) && (
                                        <div className={"exercise-details"}>
                                            <p>Sets: {exercise.setCount}</p>
                                            <p>Reps: {exercise.repsPerSet}</p>
                                            <p>Weight in kg: {exercise.weightInKg}</p>
                                            <p>Break in sec: {exercise.breakInSec}</p>
                                        </div>
                                    )}
                                </button>
                            )
                        }
                    )}
            </div>
            <button  className={"btn-top-right-fixed icon"} onClick={() => navigate(
                    `/workout/${workout?.id}/edit`,
                    {state:{workout:workout}}
                )}>
                    <EditIcon />
            </button>
            <div className={"footer-single-child"}>
                <button className={"icon"} onClick={() => navigate("/home")}>
                    <HomeIcon />
                </button>
            </div>
        </>
    )
}

export default DetailsPage;