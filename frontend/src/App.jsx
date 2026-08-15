import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Onboarding from "./pages/Onboarding/Onboarding";
import Dashboard from "./pages/Dashboard/Dashboard";
import Timeline from "./pages/Timeline/Timeline";
import Analysis from "./pages/Analysis/Analysis";
import Recalibration from "./pages/Recalibration/Recalibration";
import Settings from "./pages/Settings/Settings";
import Session from "./pages/Session/Session";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/protocol" element={<Recalibration />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/session" element={<Session />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;