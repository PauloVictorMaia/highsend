import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateNode from "./pages/fluxogram/App";


const App = () => {
  return (
    <BrowserRouter>
      <DashBoard>
        <Routes>
          <Route path="/" element={<CreateFluxogram />} />
          <Route path="/update" element={<UpdateNode />} />
        </Routes>

      </DashBoard>
    </BrowserRouter>
  );
}

export default App;