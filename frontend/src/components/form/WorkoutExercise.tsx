/*
import {ExerciseType} from "../../types/types.ts";

type WorkoutExerciseType = {
    key: string,
    exercise: ExerciseType
}

function WorkoutExercise({key, exercise}: Readonly<WorkoutExerciseType>) {
    return (
        <>
            <fieldset key={key}>
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
        </>
    )
}

export default WorkoutExercise;*/
