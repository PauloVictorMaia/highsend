import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram/CreateFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <DashBoard>
        <Routes>
          <Route path="/" element={<CreateFluxogram />} />
        </Routes>

      </DashBoard>
    </BrowserRouter>
  );
}

export default App;