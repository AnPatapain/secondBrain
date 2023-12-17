import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import EditablePage from "./pages/EditablePage";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/page"} element={<EditablePage/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;