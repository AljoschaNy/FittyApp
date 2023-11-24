import {useLocation} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import FooterFormPages from "../components/footer/FooterFormPages.tsx";
import WorkoutForm from "../components/form/WorkoutForm.tsx";

type EditPageProps = {
    onWorkoutChange: () => void
}

function EditPage({onWorkoutChange}: EditPageProps) {
    const location = useLocation();
    const workout = location.state.workout;

    return (
        <>
            <HeaderPages pageTitle={"Edit"} />
            <WorkoutForm formType={"edit"} onWorkoutChange={onWorkoutChange} initialWorkout={workout} />
            <FooterFormPages cancelDestination={`/workout/${workout.id}`} formId={"workout-form"} />
        </>
    );
}

export default EditPage;
