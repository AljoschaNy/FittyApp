import WorkoutProvider from "./WorkoutProvider.tsx";
import AddPage from "../../pages/AddPage.tsx";

type Props = {
    userId: string
}

function AddPageWithWorkouts({ userId }: Readonly<Props>) {
    return(
        <WorkoutProvider userId={userId}>
            <AddPage userId={userId}/>
        </WorkoutProvider>
    )
}

export default AddPageWithWorkouts;