import WorkoutProvider from "./WorkoutProvider.tsx";
import EditPage from "../../pages/EditPage.tsx";
import {ModifyPageWithWorkoutsProps} from "../../types/types.ts";

function EditPageWithWorkouts({ userId }: Readonly<ModifyPageWithWorkoutsProps>) {
    return(
        <WorkoutProvider userId={userId}>
            <EditPage />
        </WorkoutProvider>
    )
}

export default EditPageWithWorkouts;