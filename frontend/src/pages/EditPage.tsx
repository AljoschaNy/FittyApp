import {useLocation, useNavigate} from "react-router-dom";
import HeaderPages from "../components/header/HeaderPages.tsx";
import FooterFormPages from "../components/footer/FooterFormPages.tsx";
import WorkoutForm from "../components/form/WorkoutForm.tsx";
import axios from "axios";
import TrashBin from "../components/svg/TrashBin.tsx";
import {useState} from "react";
import ConfirmModal from "../components/form/ConfirmModal.tsx";

function EditPage() {
    const location = useLocation();
    const workout = location.state.workout;
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false)
    }

    function deleteWorkout() {
        axios.delete(`/api/workouts/${workout.id}`)
            .then(() => {
                navigate("/home");
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <HeaderPages pageTitle={"Edit"} />
            <button
                className={"btn-top-right-fixed icon"}
                type={"button"}
                onClick={openModal}>
                <TrashBin />
            </button>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => {
                    deleteWorkout();
                    closeModal();
                }}
            />
            <div className={"main-wrapper"}>
                <WorkoutForm formType={"edit"} initialWorkout={workout} />
            </div>
            <FooterFormPages cancelDestination={`/workout/${workout.id}`} formId={"workout-form"} />
        </>
    );
}

export default EditPage;
