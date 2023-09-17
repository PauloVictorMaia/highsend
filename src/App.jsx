import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram/CreateFluxogram";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in/sign-in";
import Fluxograms from "./pages/fluxograms/Fluxograms";
import Schedules from "./pages/schedules/Schedules";
import Leads from "./pages/leads/Leads";
import Analytics from "./pages/analytics/Analytics";
import { ContextProvider } from "./contexts/ContextProvider";
import AddSchedule from "./pages/addSchedules";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import ScheduleEvent from "./pages/scheduleEvent";
import Chatbot from "./pages/viewFluxogram";
import IntegrationsList from "./pages/integrations/integrationsList";
import EditGoogleIntegration from "./pages/integrations/editGoogleIntegration";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";


const App = () => {

  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agendar-evento/:userId/:calendarId" element={<ScheduleEvent />} />
          <Route path="/fluxo-de-bot/:id" element={<Chatbot />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<DashBoard />}>
            <Route path="fluxograms" element={<Fluxograms />} />
            <Route path="fluxograms/edit/:flowid" element={<CreateFluxogram />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="schedules/edit/:id" element={<AddSchedule />} />
            <Route path="leads" element={<Leads />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<IntegrationsList />} />
            <Route path="integrations/google-integration/edit/:id" element={<EditGoogleIntegration />} />
          </Route>
        </Routes>
      </ContextProvider>
      <ToastContainer
        position="top-right"
        style={{ right: "80px" }}
        autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;