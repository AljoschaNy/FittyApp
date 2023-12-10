import "./FooterFormPages.css";
import {useNavigate} from "react-router-dom";
import {FooterFormPagesType} from "../../types/types.ts";
import CrossBold from "../svg/CrossBold.tsx";
import CheckBold from "../svg/CheckBold.tsx";

function FooterFormPages({cancelDestination, formId}:Readonly<FooterFormPagesType>) {
    const navigate = useNavigate();

    return (
        <>
            <div className={"position-fix-bottom"}></div>
            <footer className={"footer-form-pages"}>
                <button className={"icon"} onClick={() => navigate(cancelDestination)}><CrossBold /></button>
                <button className={"icon"} type={"submit"} form={formId}><CheckBold /></button>
            </footer>
        </>
    );
}

export default FooterFormPages;