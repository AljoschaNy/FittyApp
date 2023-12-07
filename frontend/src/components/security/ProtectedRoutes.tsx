import {AppUser} from "../../App.tsx";
import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    appUser: AppUser | null | undefined
}

function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {
    const isAuth = props.appUser !== null;

    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoutes;