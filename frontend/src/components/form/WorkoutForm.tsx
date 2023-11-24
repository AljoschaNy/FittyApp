import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Workout, WorkoutExercise, WorkoutNoId} from "../../types/types.ts";
import axios from "axios";

type WorkoutFormType = {
    formType: "new" | "edit",
    onWorkoutChange: () => void,
    initialWorkout: Workout
}

function WorkoutForm({formType, initialWorkout, onWorkoutChange}: Readonly<WorkoutFormType>) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState<WorkoutExercise[]>(initialWorkout.plan);
    const [nextId, setNextId] = useState(0);

    const [workout, setWorkout] = useState<Workout>(initialWorkout);

    function handleWorkoutChange(event:React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setWorkout(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleExerciseChange(id:number, event:React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        const updatedExercises = exercises.map(exercise => {
            return exercise.id === id ? {...exercise, [name]: value} : exercise;
        });
        setExercises(updatedExercises);
    }

    function addNewExerciseForm() {
        setExercises([...exercises, {
            id: nextId,
            name: "",
            setCount: 0,
            repsPerSet: 0,
            weightInKg: 0,
            breakInSec: 0
        }])
        setNextId(nextId+1);
    }

    function deleteExerciseForm(id:number) {
        setExercises(exercises.filter(exercise => exercise.id !== id))
    }

    function modifyWorkout() {
        const newWorkoutData:WorkoutNoId = {
            userId:initialWorkout.userId,
            ...workout,
            plan: exercises,
        };

        formType === "new" && axios.post('/api/workouts', newWorkoutData)
            .then(() => onWorkoutChange())
            .catch(error => {
                console.error('Error adding data:', error);
            });

        formType === "edit" && axios
            .put(`/api/workouts/edit/${initialWorkout.id}`, newWorkoutData)
            .then(() => onWorkoutChange())
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        modifyWorkout();
        formType === "new" && navigate("/");
        formType === "edit" && navigate(`/workout/${initialWorkout.id}`);
    }
    return (
        <div className={"container"}>
            <main className={"main-add-page"}>
                <form id={"workout-form"} onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type={"text"}
                            value={workout.workoutName}
                            onChange={(event) => handleWorkoutChange(event)}
                        />
                    </label><br/>
                    <label>
                        Description
                        <input
                            type={"text"}
                            value={workout.description}
                            onChange={(event) => handleWorkoutChange(event)}
                        />
                    </label><br/>
                    <label>
                        Day
                        <input
                            type={"text"}
                            value={workout.workoutDay}
                            onChange={(event) => handleWorkoutChange(event)}
                            required={true}
                        />
                    </label><br/>

                    <fieldset>
                        <legend>Exercise</legend>
                        {exercises.map((exercise:WorkoutExercise) => (
                            <div key={exercise.id}>
                                <label>Name
                                    <input
                                        type={"text"}
                                        name={"name"}
                                        value={exercise.name}
                                        onChange={(event) => handleExerciseChange(exercise.id,event)}
                                    />
                                </label><br/>
                                <label>Sets
                                    <input
                                        type={"number"}
                                        name={"setCount"}
                                        value={exercise.setCount}
                                        onChange={(event) => handleExerciseChange(exercise.id,event)}
                                    />
                                </label><br/>
                                <label>Reps
                                    <input
                                        type={"number"}
                                        name={"repsPerSet"}
                                        value={exercise.repsPerSet}
                                        onChange={(event) => handleExerciseChange(exercise.id,event)}
                                    />
                                </label><br/>
                                <label>Weight in kg
                                    <input
                                        type={"number"}
                                        name={"weightInKg"}
                                        value={exercise.weightInKg}
                                        onChange={(event) => handleExerciseChange(exercise.id,event)}
                                    />
                                </label><br/>
                                <label>Break in sec
                                    <input
                                        type={"number"}
                                        name={"breakInSec"}
                                        value={exercise.breakInSec}
                                        onChange={(event) => handleExerciseChange(exercise.id,event)}
                                    />
                                </label><br/>
                                <button type={"button"} onClick={() => deleteExerciseForm(exercise.id)}>Delete</button>
                            </div>
                        ))}

                    </fieldset>
                    <button type={"button"} onClick={addNewExerciseForm}>Add</button>
                </form>
            </main>
        </div>
    );
}

export default WorkoutForm;