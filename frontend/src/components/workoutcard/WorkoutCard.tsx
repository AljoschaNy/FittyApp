import RightArrow from "../svg/RightArrow.tsx";
import {WorkoutCardProps} from "../../types/types.ts";
import {useNavigate} from "react-router-dom";

function WorkoutCard({ workout }:Readonly<WorkoutCardProps>) {
    const navigate = useNavigate();

    function handleClick(id:string) {
        navigate(`/workout/${id}`);
    }

    function truncateText(text:string, maxLength:number) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    return (
        <div key={workout.id} className={"workout-card"}>
            <div className={"workout-card-head"}>
                <h3>{workout.name}</h3>
                <p>{workout.day}</p>
            </div>
            <div className={"workout-card-body"}>
                <p>{truncateText(workout.description,25)}</p>
                <p>{workout.plan.length} Exercise(s)</p>
            </div>
            <button
                className={"icon-bottom-right btn-details"}
                onClick={() => workout.id && handleClick(workout.id)}
                onKeyDown={(event) => {
                    if(event.key === "Enter") {
                        workout.id && handleClick(workout.id);
                    }
                }}
                aria-labelledby={`workoutName-${workout.id}`}
            >
                <RightArrow />
            </button>
        </div>
    )
}

export default WorkoutCard;
