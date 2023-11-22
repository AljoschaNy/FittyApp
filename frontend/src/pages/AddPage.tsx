import "./AddPage.css";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {Workout} from "../types/types.ts";


function AddPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [day, setDay] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [breakTime, setBreakTime] = useState(0);

    function addWorkout() {
        const newWorkoutData:Workout = {
            userId:"655b5b283f332f4fcfbf02c0",
            workoutName: name,
            workoutDay:day,
            description: description,
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
            .then(() => console.log("Workout saved"))
            .catch(error => {
                console.error('Error adding data:', error);
            });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        addWorkout();
        navigate("/");
    }

    return (
        <>
            <header className={"header-add-page"}>
                <div className={"page-header-bg"}></div>
                <h2>New Workout</h2>
            </header>
            <div className={"position-fix"}></div>
            <div className={"container"}>
                <main className={"main-add-page"}>
                    <form id={"workout-form"} onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                type={"text"}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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
                                value={day}
                                onChange={(event) => setDay(event.target.value)}
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
                                />
                            </label><br/>
                            <label>Reps
                                <input
                                    type={"number"}
                                    value={reps}
                                    onChange={(event) => setReps(parseInt(event.target.value))}
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