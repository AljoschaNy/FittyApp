import WorkoutProvider from "./WorkoutProvider.tsx";
import ProfilePage from "../../pages/ProfilePage.tsx";
import {ProfilePageWithWorkoutsProps} from "../../types/types.ts";

function ProfilePageWithWorkouts({ appUser }: Readonly<ProfilePageWithWorkoutsProps>) {
    return (
        <WorkoutProvider userId={appUser.id}>
            <ProfilePage appUser={appUser} />
        </WorkoutProvider>
    );
}

export default ProfilePageWithWorkouts;
