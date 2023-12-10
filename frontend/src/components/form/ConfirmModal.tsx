import "./ConfirmModal.css";
import CrossBold from "../svg/CrossBold.tsx";
import CheckBold from "../svg/CheckBold.tsx";

type ConfirmModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void
}

function ConfirmModal({ isOpen, onConfirm, onClose }: Readonly<ConfirmModalProps>) {
    if(!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Delete Workout</h2>
                <p>Are you sure?</p>
                <div className={"modal-buttons"}>
                    <button className={"icon"} onClick={onConfirm}><CheckBold /></button>
                    <button className={"icon btn-modal-delete"} onClick={onClose}><CrossBold /></button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;
