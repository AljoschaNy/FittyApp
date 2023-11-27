import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        if (initialWorkout.plan.length > 0) {
            const maxId = Math.max(...initialWorkout.plan.map(exercise => exercise.id));
            setNextId(maxId + 1);
        }
    }, [initialWorkout]);

    function handleExerciseChange(indexToChange:number, event:React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        const updatedExercises = exercises.map((exercise,index) => {
            return index === indexToChange ? {...exercise, [name]: value} : exercise;
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

    function deleteExerciseForm(indexToDelete:number) {
        setExercises(exercises.filter((_exercise:WorkoutExercise,index:number) => index !== indexToDelete))
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
            .put(`/api/workouts/${initialWorkout.id}`, newWorkoutData)
            .then(() => onWorkoutChange())
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        modifyWorkout();
        formType === "new" && navigate("/");
        formType === "edit" && navigate(`/workout/${initialWorkout.id}`, {state:{updated:true}});
    }
    return (
        <div className={"container"}>
            <main className={"main-add-page"}>
                <form id={"workout-form"} onSubmit={handleSubmit}>
                    <label>
                        <span>Name</span>
                        <input
                            type={"text"}
                            name={"workoutName"}
                            value={workout.workoutName}
                            onChange={(event) => handleWorkoutChange(event)}
                        />
                    </label><br/>
                    <label>
                        <span>Description</span>
                        <input
                            type={"text"}
                            name={"description"}
                            value={workout.description}
                            onChange={(event) => handleWorkoutChange(event)}
                        />
                    </label><br/>
                    <label>
                        <span>Day</span>
                        <input
                            type={"text"}
                            name={"workoutDay"}
                            value={workout.workoutDay}
                            onChange={(event) => handleWorkoutChange(event)}
                            required={true}
                        />
                    </label><br/>

                    <fieldset>
                        <legend>Exercise</legend>
                        {exercises.map((exercise:WorkoutExercise,index) => (

                            <div key={`${exercise.id} - ${index}`}>
                                <label>
                                    <span>Name</span>
                                    <input
                                        type={"text"}
                                        name={"name"}
                                        value={exercise.name}
                                        onChange={(event) => handleExerciseChange(index,event)}
                                    />
                                </label><br/>
                                <label>
                                    <span>Sets</span>
                                    <input
                                        type={"number"}
                                        name={"setCount"}
                                        value={exercise.setCount}
                                        onChange={(event) => handleExerciseChange(index,event)}
                                    />
                                </label><br/>
                                <label>
                                    <span>Reps</span>
                                    <input
                                        type={"number"}
                                        name={"repsPerSet"}
                                        value={exercise.repsPerSet}
                                        onChange={(event) => handleExerciseChange(index,event)}
                                    />
                                </label><br/>
                                <label>
                                    <span>Weight in kg</span>
                                    <input
                                        type={"number"}
                                        name={"weightInKg"}
                                        value={exercise.weightInKg}
                                        onChange={(event) => handleExerciseChange(index,event)}
                                    />
                                </label><br/>
                                <label>
                                    <span>Break in sec</span>
                                    <input
                                        type={"number"}
                                        name={"breakInSec"}
                                        value={exercise.breakInSec}
                                        onChange={(event) => handleExerciseChange(index,event)}
                                    />
                                </label><br/>
                                <button type={"button"} onClick={() => deleteExerciseForm(index)}>Delete</button>
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