import DashBoard from "./containers/Dashboard";
import CreateFluxogram from "./pages/createFluxogram/CreateFluxogram";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Fluxograms from "./pages/fluxograms/Fluxograms";
import Schedules from "./pages/schedules/Schedules";
import Leads from "./pages/leads/Leads";
import Analytics from "./pages/analytics/Analytics";
import { ContextProvider } from "./contexts/ContextProvider";
import AddSchedule from "./pages/addSchedules";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import IntegrationsList from "./pages/integrations/integrationsList";
import EditIntegration from "./pages/integrations/editIntegration";
import LoginPage from "./pages/Login";
import LeadsResults from "./pages/leads/leadsResults";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import NotFoundPage from "./pages/notFoundPage";
import Plans from "./pages/Plans";
import MyProfile from "./pages/MyProfile/index.jsx";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Theme/Light.js";
// import Chatbot from "./pages/viewFluxogram";
// import LandingPage from "./pages/LandingPage";
// import ExternalPageShedule from "./pages/externalPageSchedule";

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} />
            <Route path="/agendar-evento/:userId/:calendarId" element={<ExternalPageShedule />} />
            <Route path="/fluxo-de-bot/:userId/:flowId" element={<Chatbot />} /> */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/subscription/:type/:subscriptionId" element={<SubscriptionPage />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/dashboard/*" element={<DashBoard />}>
              <Route index element={<Navigate to="fluxograms" />} />
              <Route path="fluxograms" element={<Fluxograms />} />
              <Route path="fluxograms/edit/:flowid" element={<CreateFluxogram />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="schedules/edit/:id" element={<AddSchedule />} />
              <Route path="leads" element={<Leads />} />
              <Route path="leads/:flowName/:flowId" element={<LeadsResults />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="integrations" element={<IntegrationsList />} />
              <Route path="integrations/edit-integration/:name/:id" element={<EditIntegration />} />
              <Route path="profile" element={<MyProfile />} />
            </Route>
          </Routes>
        </ContextProvider>
        <ToastContainer
          position="top-right"
          style={{ right: "80px" }}
          autoClose={2000}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;