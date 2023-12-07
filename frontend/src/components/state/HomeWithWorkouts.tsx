import WorkoutProvider from "./WorkoutProvider.tsx";
import HomePage from "../../pages/HomePage.tsx";

type Props = {
    userId: string,
    userName: string | undefined
}

function HomeWithWorkouts({ userId, userName }: Readonly<Props>) {
    return(
        <WorkoutProvider userId={userId}>
            <HomePage userName={userName}/>
        </WorkoutProvider>
    )
}

export default HomeWithWorkouts;