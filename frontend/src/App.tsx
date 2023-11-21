import {Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/workout/add"} element={<AddPage />} />
        </Routes>
    </>
  )
}

export default App
