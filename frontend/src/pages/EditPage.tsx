import {useLocation, useNavigate} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import FooterFormPages from "../components/footer/FooterFormPages.tsx";
import WorkoutForm from "../components/form/WorkoutForm.tsx";
import {EditPageProps} from "../types/types.ts";
import axios from "axios";
import TrashBin from "../components/svg/TrashBin.tsx";

function EditPage({onWorkoutChange}: Readonly<EditPageProps>) {
    const location = useLocation();
    const workout = location.state.workout;
    const navigate = useNavigate();

    function deleteWorkout() {
        axios.delete(`/api/workouts/${workout.id}`)
            .then(() => {
                navigate("/");
                onWorkoutChange();
            })
    }

    return (
        <>
            <HeaderPages pageTitle={"Edit"} />
            <button
                className={"btn-top-right-fixed icon"}
                type={"button"}
                onClick={deleteWorkout}><TrashBin /></button>
            <div className={"main-wrapper"}>
                <WorkoutForm formType={"edit"} onWorkoutChange={onWorkoutChange} initialWorkout={workout} />
            </div>
            <FooterFormPages cancelDestination={`/workout/${workout.id}`} formId={"workout-form"} />
        </>
    );
}

export default EditPage;
