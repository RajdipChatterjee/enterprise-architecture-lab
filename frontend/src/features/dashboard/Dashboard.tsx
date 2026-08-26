import { useState } from "react";
import { DashboardToolbar } from "./components/DashboardToolbar";
import { Pagination } from "./components/Pagination";
import { SurveyTable } from "./components/SurveyTable";
import { SurveyFormDrawer } from "./components/SurveyFormDrawer";
import { getSurveys } from "../../api/surveyApi";
import { downloadSurveysCsv } from "../../utils/downloadCsv";

import type { SurveyParams, SurveyStatus } from "../../types/survey";

export function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Partial<SurveyParams>>({});

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // We will get this from the API later
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterApply = (status: SurveyStatus) => {
    setFilters((prev) => ({
      ...prev,
      status,
    }));
    setPage(1);
  };

  const handleCriteriaFilterApply = (criteria: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [criteria]: criteria === "rating" ? (value ? Number(value) : undefined) : value || undefined,
    }));
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDownload = async () => {
    const response = await getSurveys({
      page: 1,
      pageSize: 10000,
    });

    downloadSurveysCsv(response.data.items);
  };

  return (
    <>
      <DashboardToolbar
        openForm={() => setIsOpen(true)}
        onDownload={handleDownload}
        onRefresh={handleRefresh}
        search={search}
        onSearchChange={handleSearchChange}
        onStatusFilterApply={handleStatusFilterApply}
        onCriteriaFilterApply={handleCriteriaFilterApply}
      />

      <SurveyFormDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        onSurveyCreated={handleRefresh}
      />

      <SurveyTable
        refreshKey={refreshKey}
        page={page}
        pageSize={pageSize}
        onTotalPagesChange={setTotalPages}
        search={search}
        filters={filters}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
}
