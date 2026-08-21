import { useState } from "react";
import { DashboardToolbar } from "./components/DashboardToolbar";
import { Pagination } from "./components/Pagination";
// import { SurveyFormDrawer } from "./components/SurveyFormDrawer";
import { SurveyTable } from "./components/SurveyTable";
import { SurveyFormDrawer } from "./components/SurveyFormDrawer";

export function Dashboard() {
  const [refreshKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DashboardToolbar openForm={() => setIsOpen(true)} />
      <SurveyFormDrawer open={isOpen} onOpenChange={setIsOpen} />
      <SurveyTable refreshKey={refreshKey} />
      <Pagination />
    </>
  );
}
