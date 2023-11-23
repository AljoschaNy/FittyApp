import {useNavigate} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";

function DetailsPage() {
    const navigate = useNavigate();

    return (
        <>
            <HeaderPages pageTitle={"Details"} />
            <button className={"btn-bottom-center-fixed"} onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default DetailsPage;