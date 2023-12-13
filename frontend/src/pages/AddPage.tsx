import {AddPageProps, WorkoutNoId} from "../types/types.ts";
import HeaderPages from "../components/header/HeaderPages.tsx";
import FooterFormPages from "../components/footer/FooterFormPages.tsx";
import WorkoutForm from "../components/form/WorkoutForm.tsx";

function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function AddPage({userId}:Readonly<AddPageProps>) {
    const initialWorkout:WorkoutNoId = {
        userId,
        name: "",
        description: "",
        day: getCurrentDateFormatted(),
        plan: []
    }

    return (
        <>
            <HeaderPages pageTitle={"New Workout"} />
            <div className={"main-wrapper"}>
                <WorkoutForm formType={"new"} initialWorkout={initialWorkout} />
            </div>
            <FooterFormPages cancelDestination={"/home"} formId={"workout-form"} />
        </>
    );
}

export default AddPage;