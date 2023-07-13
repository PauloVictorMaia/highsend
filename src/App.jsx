import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DnDFlow from "./pages/fluxogram/DnDFlow";

const App = () => {
  return (
    <BrowserRouter>
      <DashBoard>
        <Routes>
          <Route path="/create-fluxogram" element={<CreateFluxogram />} />
          <Route path="/fluxogram" element={<DnDFlow />} />
        </Routes>

      </DashBoard>
    </BrowserRouter>
  );
}

export default App;