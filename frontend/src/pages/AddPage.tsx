import {AddPageProps, WorkoutNoId} from "../types/types.ts";
import HeaderPages from "../components/header/HeaderPages.tsx";
import FooterFormPages from "../components/footer/FooterFormPages.tsx";
import WorkoutForm from "../components/form/WorkoutForm.tsx";

function AddPage({userId}:Readonly<AddPageProps>) {
    const initialWorkout:WorkoutNoId = {
        userId,
        name: "",
        description: "",
        day: "",
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