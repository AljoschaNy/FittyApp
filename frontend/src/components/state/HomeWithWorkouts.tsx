import WorkoutProvider from "./WorkoutProvider.tsx";
import HomePage from "../../pages/HomePage.tsx";
import {HomeWithWorkoutsProps} from "../../types/types.ts";

function HomeWithWorkouts({ userId, userName }: Readonly<HomeWithWorkoutsProps>) {
    return(
        <WorkoutProvider userId={userId}>
            <HomePage userName={userName}/>
        </WorkoutProvider>
    )
}

export default HomeWithWorkouts;
