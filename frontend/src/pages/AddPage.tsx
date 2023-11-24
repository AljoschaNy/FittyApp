import "./AddPage.css";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {AddPageProps, WorkoutNoId} from "../types/types.ts";
import HeaderPages from "../components/header/HeaderPages.tsx";

function AddPage({userId, onWorkoutChange}:Readonly<AddPageProps>) {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [workoutDay, setWorkoutDay] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [breakTime, setBreakTime] = useState(0);

    function addWorkout(userId:string) {
        const newWorkoutData:WorkoutNoId = {
            userId,
            workoutName,
            workoutDay,
            description,
            plan: [
                {
                    name: exerciseName,
                    setCount: sets,
                    repsPerSet: reps,
                    weightInKg: weight,
                    breakInSec: breakTime
                }
            ]
        }

        axios.post('/api/workouts', newWorkoutData)
            .then(() => onWorkoutChange())
            .catch(error => {
                console.error('Error adding data:', error);
            });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        addWorkout(userId);
        navigate("/");
    }

    return (
        <>
            <HeaderPages pageTitle={"New Workout"} />
            <div className={"container"}>
                <main className={"main-add-page"}>
                    <form id={"workout-form"} onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                type={"text"}
                                value={workoutName}
                                onChange={(event) => setWorkoutName(event.target.value)}
                            />
                        </label><br/>
                        <label>
                            Description
                            <input
                                type={"text"}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label><br/>
                        <label>
                            Day
                            <input
                                type={"text"}
                                value={workoutDay}
                                onChange={(event) => setWorkoutDay(event.target.value)}
                                required={true}
                            />
                        </label><br/>

                        <fieldset>
                            <legend>Exercise</legend>
                            <label>Name
                                <input
                                    type={"text"}
                                    value={exerciseName}
                                    onChange={(event) => setExerciseName(event.target.value)}
                                />
                            </label><br/>
                            <label>Sets
                                <input
                                    type={"number"}
                                    value={sets}
                                    onChange={(event) => setSets(parseInt(event.target.value))}
                                    required={true}
                                />
                            </label><br/>
                            <label>Reps
                                <input
                                    type={"number"}
                                    value={reps}
                                    onChange={(event) => {
                                        event.target.value ? setReps(parseInt(event.target.value)) : setReps(0)
                                    }}
                                />
                            </label><br/>
                            <label>Weight
                                <input
                                    type={"number"}
                                    value={weight}
                                    onChange={(event) => setWeight(parseInt(event.target.value))}
                                />
                            </label><br/>
                            <label>Break
                                <input
                                    type={"number"}
                                    value={breakTime}
                                    onChange={(event) => setBreakTime(parseInt(event.target.value))}
                                />
                            </label>
                        </fieldset>
                    </form>
                </main>
            </div>
            <div className={"position-fix"}></div>
            <div className={"container"}>
                <footer className={"footer-add-page"}>
                    <button onClick={() => navigate("/")}>cancel</button>
                    <button type={"submit"} form={"workout-form"}>save</button>
                </footer>
            </div>
        </>
    );
}

export default AddPage;