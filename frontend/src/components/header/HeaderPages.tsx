import "./HeaderPages.css";
import {HeaderPagesProps} from "../../types/types.ts";
function HeaderPages({pageTitle}: Readonly<HeaderPagesProps>) {
    return(
        <>
            <header className={"header-pages"}>
                <div className={"header-pages-bg"}></div>
                <h2>{pageTitle}</h2>
            </header>
            <div className={"position-fix-top"}></div>
        </>
    )
}

export default HeaderPages;