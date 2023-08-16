import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram/CreateFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/sign-in";
import Fluxograms from "./pages/fluxograms/Fluxograms";
import Schedules from "./pages/schedules/Schedules";
import Leads from "./pages/leads/Leads";
import Analytics from "./pages/analytics/Analytics";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
      <DashBoard>
        <Routes>
          <Route path="/fluxograms" element={<Fluxograms />} />
          <Route path="/fluxograms/create/:id?" element={<CreateFluxogram />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </DashBoard>
    </BrowserRouter>
  );
}

export default App;