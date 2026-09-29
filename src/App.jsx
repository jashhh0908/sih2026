import { Routes, Route } from "react-router-dom";
import { SelectedSiteProvider } from "./context/SelectedSiteContext.jsx";
import Layout from "./components/Layout.jsx";
import SituationMap from "./pages/SituationMap.jsx";
import SiteAnalysis from "./pages/SiteAnalysis.jsx";
import SiteHistory from "./pages/SiteHistory.jsx";
import Register from "./pages/Register.jsx";
import Alerts from "./pages/Alerts.jsx";
import Exercise from "./pages/Exercise.jsx";
import FacilityView from "./pages/FacilityView.jsx";
import DataMethod from "./pages/DataMethod.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <SelectedSiteProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SituationMap />} />
          <Route path="/site-analysis" element={<SiteAnalysis />} />
          <Route path="/site-analysis/:siteId" element={<SiteAnalysis />} />
          <Route path="/site-history" element={<SiteHistory />} />
          <Route path="/site-history/:siteId" element={<SiteHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/exercise/:scenarioId" element={<Exercise />} />
          <Route path="/facility-view" element={<FacilityView />} />
          <Route path="/facility-view/:facilityId" element={<FacilityView />} />
          <Route path="/data-method" element={<DataMethod />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SelectedSiteProvider>
  );
}
