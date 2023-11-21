import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    return(
        <>
            <h2>Fiturae</h2>
            <button onClick={() => navigate("/workout/add")}>Add workout</button>
        </>

    )
}

export default HomePage;