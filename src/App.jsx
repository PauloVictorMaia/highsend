import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram/CreateFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/sign-in";
import Fluxograms from "./pages/fluxograms/Fluxograms";

const App = () => {
  return (
    <BrowserRouter>
      <DashBoard>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/fluxograms" element={<Fluxograms />} />
          <Route path="/fluxograms/create" element={<CreateFluxogram />} />
        </Routes>

      </DashBoard>
    </BrowserRouter>
  );
}

export default App;