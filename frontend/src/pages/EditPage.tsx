import {useLocation, useNavigate} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import {useState} from "react";

function EditPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const workout = location.state.workout;
    const [workoutName, setWorkoutName] = useState(workout.workoutName);
    const [description, setDescription] = useState(workout.description);
    const [workoutDay, setWorkoutDay] = useState(workout.workoutDay);
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [breakTime, setBreakTime] = useState(0);


    return (
        <>
            <HeaderPages pageTitle={"Edit"} />
            <div className={"container"}>
                <main className={"main-add-page"}>
                    <form id={"workout-form"}>
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
                        {workout.plan.map(exercise => {
                            return (
                                <fieldset>
                                    <legend>Exercise</legend>
                                    <label>Name
                                        <input
                                            type={"text"}
                                            value={exercise.name}
                                            onChange={(event) => setExerciseName(event.target.value)}
                                        />
                                    </label><br/>
                                    <label>Sets
                                        <input
                                            type={"number"}
                                            value={exercise.setCount}
                                            onChange={(event) => setSets(parseInt(event.target.value))}
                                            required={true}
                                        />
                                    </label><br/>
                                    <label>Reps
                                        <input
                                            type={"number"}
                                            value={exercise.repsPerSet}
                                            onChange={(event) => {
                                                event.target.value ? setReps(parseInt(event.target.value)) : setReps(0)
                                            }}
                                        />
                                    </label><br/>
                                    <label>Weight
                                        <input
                                            type={"number"}
                                            value={exercise.weightInKg}
                                            onChange={(event) => setWeight(parseInt(event.target.value))}
                                        />
                                    </label><br/>
                                    <label>Break
                                        <input
                                            type={"number"}
                                            value={exercise.breakInSec}
                                            onChange={(event) => setBreakTime(parseInt(event.target.value))}
                                        />
                                    </label>
                                </fieldset>
                            )
                        })}


                    </form>
                </main>
            </div>
            <button className={"btn-top-right-fixed"} onClick={() => navigate(`/workout/${workout?.id}`)}>Cancel</button>
        </>
    );
}

export default EditPage;