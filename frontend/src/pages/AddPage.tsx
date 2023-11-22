import "./AddPage.css";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

type Exercise = {
    id: number,
    name:string,
    sets: number,
    reps: number,
    weight: number,
    break: number
}

function AddPage() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] =useState(0);
    const [weight, setWeight] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [nextId, setNextId] = useState(0);
    function addNewExerciseForm() {
        setExercises([...exercises, {
            id: nextId,
            name:"",
            sets: 0,
            reps: 0,
            weight: 0,
            break: 0
            }
        ]);
        setNextId(nextId+1);
    }

    function deleteExerciseForm(id:number) {
        const newExercises = exercises.filter((exercise:Exercise) => exercise.id !== id);
        setExercises(newExercises);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
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
                    <form onSubmit={handleSubmit}>
                        <label>Name <input type={"text"} /> </label><br/>
                        <label>Description <input type={"text"} /> </label><br/>
                        <label>Day <input type={"text"} /> </label><br/>
                        {exercises.map(exercise => {
                            return <fieldset key={exercise.id}>
                                <legend>Exercise</legend>
                                <label>
                                    Name
                                    <input
                                        type={"text"}
                                        defaultValue={exercise.name}
                                    />
                                </label><br/>
                                <label>Sets <input type={"number"} defaultValue={exercise.sets}/></label><br/>
                                <label>Reps <input type={"number"} defaultValue={exercise.reps}/></label><br/>
                                <label>Weight <input type={"number"} defaultValue={exercise.weight}/></label><br/>
                                <label>Break <input type={"number"} defaultValue={exercise.break}/></label>
                                <button type={"button"} onClick={() => deleteExerciseForm(exercise.id)}>Delete</button>
                            </fieldset>
                        })
                        }
                        <button type={"button"} onClick={addNewExerciseForm}>Add Exercise</button>
                    </form>

                </main>
            </div>
            <div className={"position-fix"}></div>
            <div className={"container"}>
                <footer className={"footer-add-page"}>
                        <button onClick={() => navigate("/")}>0</button>
                        <button>1</button>
                </footer>
            </div>
        </>
    );
}

export default AddPage;