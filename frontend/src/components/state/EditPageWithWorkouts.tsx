import WorkoutProvider from "./WorkoutProvider.tsx";
import EditPage from "../../pages/EditPage.tsx";

type Props = {
    userId: string
}

function AddPageWithWorkouts({ userId }: Readonly<Props>) {
    return(
        <WorkoutProvider userId={userId}>
            <EditPage />
        </WorkoutProvider>
    )
}

export default AddPageWithWorkouts;