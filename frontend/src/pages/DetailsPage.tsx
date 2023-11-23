import {useNavigate} from "react-router-dom";

function DetailsPage() {
    const navigate = useNavigate();

    return (
        <>
            <h2>Details Page</h2>
            <button onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default DetailsPage;