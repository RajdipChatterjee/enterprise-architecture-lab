import { Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./features/dashboard/Dashboard";
import OnboardingPage from "./features/practiceOnboarding/OnboardingPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="practice-onboarding"
          element={<OnboardingPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;