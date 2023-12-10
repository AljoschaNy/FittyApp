import "./HeaderPages.css";
import {HeaderPagesProps} from "../../types/types.ts";
function HeaderPages({pageTitle}: Readonly<HeaderPagesProps>) {
    return(
        <header>
            <div className={"header-pages"}>
                <div className={"header-pages-bg"}></div>
                <h2>{pageTitle}</h2>
            </div>
            <div className={"position-fix-top"}></div>
        </header>
    )
}

export default HeaderPages;