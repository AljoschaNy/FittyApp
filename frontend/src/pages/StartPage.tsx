import {useNavigate} from "react-router-dom";

function StartPage () {
    const navigate = useNavigate();

    return (
        <>
            <h2>Start Page</h2>
            <button onClick={() => navigate("/home")}>GET STARTED</button>
        </>
    )
}

export default StartPage;