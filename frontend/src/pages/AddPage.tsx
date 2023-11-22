import "./AddPage.css";
import {useNavigate} from "react-router-dom";

function AddPage() {
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
    }

    return (
        <>
            <header className={"header-add-page"}>
                <div className={"page-header-bg"}></div>
                <h2>New Workout</h2>
            </header>
            <div className={"position-fix"}></div>
            <div className={"container"}>
                <main className={"main-add-page"}>
                    <form onSubmit={handleSubmit}>
                        <label>Name <input type={"text"} /> </label><br/>
                        <label>Description <input type={"text"} /> </label><br/>
                        <label>Day <input type={"text"} /> </label><br/>
                        <fieldset>
                            <legend>Exercise</legend>
                            <label>
                                Name
                                <input
                                    type={"text"}
                                />
                            </label><br/>
                            <label>Sets <input type={"number"} /></label><br/>
                            <label>Reps <input type={"number"} /></label><br/>
                            <label>Weight <input type={"number"} /></label><br/>
                            <label>Break <input type={"number"} /></label>
                        </fieldset>
                    </form>
                </main>
            </div>
            <div className={"position-fix"}></div>
            <div className={"container"}>
                <footer className={"footer-add-page"}>
                        <button onClick={() => navigate("/")}>cancel</button>
                        <button>save</button>
                </footer>
            </div>
        </>
    );
}

export default AddPage;