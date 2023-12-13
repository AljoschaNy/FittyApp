import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Workout, WorkoutExercise, WorkoutFormType, WorkoutNoId} from "../../types/types.ts";
import axios from "axios";
import "./WorkoutForm.css";
import TextInput from "./TextInput.tsx";
import {WorkoutContext} from "../state/WorkoutContext.tsx";

function WorkoutForm({formType, initialWorkout}: Readonly<WorkoutFormType>) {
    const navigate = useNavigate();
    const {fetchWorkouts} = useContext(WorkoutContext);
    const [exercises, setExercises] = useState<WorkoutExercise[]>(initialWorkout.plan);
    const [nextId, setNextId] = useState(0);
    const [workout, setWorkout] = useState<Workout>(initialWorkout);
    const [isNameError, setIsNameError] = useState(false);

    useEffect(() => {
        if (initialWorkout.plan.length > 0) {
            const maxId = Math.max(...initialWorkout.plan.map(exercise => exercise.id));
            setNextId(maxId + 1);
        }
    }, [initialWorkout]);

    function handleWorkoutChange(event:React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setWorkout(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleExerciseChange(indexToChange:number, event:React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        const updatedExercises = exercises.map((exercise,index) => {
            return index === indexToChange ? {...exercise, [name]: value} : exercise;
        });
        setExercises(updatedExercises);
    }

    function addNewExerciseForm() {
        if (exercises.length > 0 && exercises[exercises.length - 1].name === "") {
            setIsNameError(true);
            return;
        }
        setIsNameError(false);

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
        if(indexToDelete === exercises.length - 1) {
            setIsNameError(false);
        }
        setExercises(exercises.filter((_exercise:WorkoutExercise,index:number) => index !== indexToDelete))
    }

    function modifyWorkout() {
        const newWorkoutData:WorkoutNoId = {
            ...workout,
            plan: exercises,
        };

        formType === "new" && axios.post('/api/workouts', newWorkoutData)
            .then(() => {
                fetchWorkouts();
                navigate("/home")
            })
            .catch(error => {
                console.error("Error adding data: ", error);
            });

        formType === "edit" && axios
            .put(`/api/workouts/${initialWorkout.id}`, newWorkoutData)
            .then(() => {
                fetchWorkouts();
                navigate(`/workout/${initialWorkout.id}`, {state:{updated:true}})
            })
            .catch(error => {
                console.error("Error updating data: ", error);
            })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        modifyWorkout();
    }
    return (
        <div className={"container"}>
            <main className={"main-add-page"}>
                <form id={"workout-form"} onSubmit={handleSubmit}>
                    <section className={"section-workout-details"}>
                        <TextInput
                            name={"Name"}
                            value={workout.name}
                            placeholder={"e.g. Push Training..."}
                            onChange={handleWorkoutChange}
                            maxLength={25}
                            required={true}
                        />
                        <TextInput name={"Description"} value={workout.description} placeholder={"e.g. 60%, 90 sec..."} onChange={handleWorkoutChange} />
                        <TextInput name={"Day"} value={workout.day} onChange={handleWorkoutChange} />
                    </section>
                    <section className={"section-exercises"}>
                        <h3>Exercises</h3>
                        <div className={"exercise-list"}>
                            {exercises.map((exercise:WorkoutExercise,index) => {
                                const exerciseKey = index+1;
                                const showError = isNameError && index === exercises.length - 1;

                                return (
                                <div className={"exercise-form"} key={`${exerciseKey}`}>
                                    <div className={"exercise-title"}>
                                        <label className={showError ? "error" : ""}>
                                            <p>Name</p>
                                            <input
                                                type={"text"}
                                                name={"name"}
                                                value={exercise.name}
                                                maxLength={25}
                                                onChange={(event) => handleExerciseChange(index,event)}
                                                required={exercises.length > 0}
                                            />
                                            {showError && <p className={"error-message"}>Please fill out the name</p> }
                                        </label><br/>
                                    </div>
                                    <div className={"exercise-numbers"}>
                                        <label className={"exercise-container"}>
                                            <p>Sets</p>
                                            <input
                                                type={"number"}
                                                name={"setCount"}
                                                value={exercise.setCount}
                                                min={1}
                                                max={20}
                                                onChange={(event) => handleExerciseChange(index,event)}
                                            />
                                        </label><br/>
                                        <label className={"exercise-container"}>
                                            <p>Reps</p>
                                            <input
                                                type={"number"}
                                                name={"repsPerSet"}
                                                value={exercise.repsPerSet}
                                                min={1}
                                                max={200}
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
                                                    min={0}
                                                    max={500}
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
                                                    min={0}
                                                    max={500}
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
