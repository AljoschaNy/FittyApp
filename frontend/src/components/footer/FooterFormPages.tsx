import "./FooterFormPages.css";
import {useNavigate} from "react-router-dom";
import {FooterFormPagesType} from "../../types/types.ts";

function FooterFormPages({cancelDestination, formId}:Readonly<FooterFormPagesType>) {
    const navigate = useNavigate();

    return (
        <>
            <div className={"position-fix-bottom"}></div>
            <div className={"container"}>
                <footer className={"footer-form-pages"}>
                    <button onClick={() => navigate(cancelDestination)}>cancel</button>
                    <button type={"submit"} form={formId}><i className="icon-set fa-solid fa-check"></i></button>
                </footer>
            </div>
        </>
    );
}

export default FooterFormPages;