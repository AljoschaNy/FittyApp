import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Workout, WorkoutExercise, WorkoutNoId} from "../../types/types.ts";
import axios from "axios";
import "./WorkoutForm.css";
import TextInput from "./TextInput.tsx";

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
            setCount: 1,
            repsPerSet: 1,
            weightInKg: 0.00,
            breakInSec: 0
        }])
        setNextId(nextId+1);
    }

    function deleteExerciseForm(indexToDelete:number) {
        setExercises(exercises.filter((_exercise:WorkoutExercise,index:number) => index !== indexToDelete))
    }

    function modifyWorkout() {
        const newWorkoutData:WorkoutNoId = {
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
                    <TextInput name={"Name"} value={workout.name} placeholder={"e.g. Push Training..."} onChange={handleWorkoutChange} />
                    <TextInput name={"Description"} value={workout.description} placeholder={"e.g. 60%, 90 sec..."} onChange={handleWorkoutChange} />
                    <TextInput name={"Day"} value={workout.day} onChange={handleWorkoutChange} />

                    <section className={"section-exercises"}>
                        <h3>Exercises</h3>
                        <div className={"exercise-list"}>
                            {exercises.map((exercise:WorkoutExercise,index) => {
                                const exerciseKey = index+1;

                                return (
                                <div className={"exercise-form"} key={`${exerciseKey}`}>
                                    <div className={"exercise-title"}>
                                        <label>
                                            <p>Name</p>
                                            <input
                                                type={"text"}
                                                name={"name"}
                                                value={exercise.name}
                                                onChange={(event) => handleExerciseChange(index,event)}
                                            />
                                        </label><br/>
                                    </div>
                                    <div className={"exercise-numbers"}>
                                        <label className={"exercise-container"}>
                                            <p>Sets</p>
                                            <input
                                                type={"number"}
                                                name={"setCount"}
                                                value={exercise.setCount}
                                                onChange={(event) => handleExerciseChange(index,event)}
                                            />
                                        </label><br/>
                                        <label className={"exercise-container"}>
                                            <p>Reps</p>
                                            <input
                                                type={"number"}
                                                name={"repsPerSet"}
                                                value={exercise.repsPerSet}
                                                onChange={(event) => handleExerciseChange(index,event)}
                                            />
                                        </label><br/>
                                        <label className={"exercise-container"}>
                                            <p>Weight</p>
                                            <div>
                                                <input
                                                    type={"number"}
                                                    name={"weightInKg"}
                                                    value={exercise.weightInKg}
                                                    onChange={(event) => handleExerciseChange(index,event)}
                                                />
                                                <span>Kg</span>
                                            </div>
                                        </label><br/>
                                        <label className={"exercise-container"}>
                                            <p>Break</p>
                                            <div>
                                                <input
                                                    type={"number"}
                                                    name={"breakInSec"}
                                                    value={exercise.breakInSec}
                                                    onChange={(event) => handleExerciseChange(index,event)}
                                                />
                                                <span>Sec</span>
                                            </div>
                                        </label><br/>
                                    </div>
                                    <button className={"btn-delete-exercise"} type={"button"} onClick={() => deleteExerciseForm(index)}>X</button>
                                </div>
                            )})}
                        </div>
                        <button className={"btn-add-exercise"} type={"button"} onClick={addNewExerciseForm}>+</button>
                    </section>
                </form>
            </main>
        </div>
    );
}

export default WorkoutForm;