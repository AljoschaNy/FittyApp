import WorkoutProvider from "./WorkoutProvider.tsx";
import AddPage from "../../pages/AddPage.tsx";
import {ModifyPageWithWorkoutsProps} from "../../types/types.ts";

function AddPageWithWorkouts({ userId }: Readonly<ModifyPageWithWorkoutsProps>) {
    return(
        <WorkoutProvider userId={userId}>
            <AddPage userId={userId}/>
        </WorkoutProvider>
    )
}

export default AddPageWithWorkouts;
