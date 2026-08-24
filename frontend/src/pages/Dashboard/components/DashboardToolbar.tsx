import { useState } from "react";
import {
  Button,
  Input,
  makeStyles,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";

import {
  AddRegular,
  ArrowDownloadRegular,
  ArrowSyncRegular,
  FilterRegular,
  SearchRegular,
} from "@fluentui/react-icons";

import { FilterPopover } from "../../../components/FilterPopover";
import type { FilterOption } from "../../../components/FilterPopover";

const useStyles = makeStyles({
  toolbar: {
    width: "100%",
  },

  spacer: {
    flexGrow: 1,
  },
});

import type { SurveyStatus } from "../../../types/survey";

type DashboardToolbarProps = {
  openForm: () => void;
  onDownload: () => Promise<void>;
  onRefresh: () => void;
  search: string;
  onSearchChange: (search: string) => void;
  onStatusFilterApply?: (status: SurveyStatus) => void;
  onCriteriaFilterApply?: (criteria: string, value: string) => void;
};

const CRITERIA_OPTIONS: FilterOption[] = [
  { key: "userName", label: "User Name" },
  { key: "accountantName", label: "Accountant Name" },
  { key: "businessName", label: "Business Name" },
  { key: "rating", label: "Rating" },
  { key: "status", label: "Status" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { key: "Active", label: "Active" },
  { key: "Inactive", label: "Inactive" },
  { key: "Completed", label: "Completed" },
];

export function DashboardToolbar({
  openForm,
  onDownload,
  onRefresh,
  search,
  onSearchChange,
  onStatusFilterApply,
  onCriteriaFilterApply,
}: DashboardToolbarProps) {
  const styles = useStyles();

  // Add Filter popover state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("userName");
  const [filterValue, setFilterValue] = useState("");

  // Status popover state
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("Active");

  return (
    <Toolbar aria-label="Dashboard Toolbar" className={styles.toolbar}>
      <div>
        <ToolbarButton icon={<AddRegular />} onClick={openForm}>
          Add Survey
        </ToolbarButton>
        <ToolbarButton icon={<ArrowSyncRegular />} onClick={onRefresh}>
          Refresh
        </ToolbarButton>
        <ToolbarButton icon={<ArrowDownloadRegular />} onClick={onDownload}>
          Download
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className={styles.spacer} />

      <div>
        <Input
          contentBefore={<SearchRegular />}
          placeholder="Search"
          value={search}
          onChange={(_, data) => onSearchChange(data.value)}
        />

        <FilterPopover
          title="Filter by Status"
          open={isStatusOpen}
          onOpenChange={setIsStatusOpen}
          valueOptions={STATUS_OPTIONS}
          value={statusValue}
          onValueChange={setStatusValue}
          onApply={() => {
            if (onStatusFilterApply) {
              onStatusFilterApply(statusValue as SurveyStatus);
            }
          }}
        >
          <Button shape="circular">Status: {statusValue}</Button>
        </FilterPopover>

        <FilterPopover
          title="Add filter"
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          criteriaOptions={CRITERIA_OPTIONS}
          criteria={filterCriteria}
          onCriteriaChange={setFilterCriteria}
          value={filterValue}
          onValueChange={setFilterValue}
          onCancel={() => setFilterValue("")}
          onApply={() => {
            if (onCriteriaFilterApply) {
              onCriteriaFilterApply(filterCriteria, filterValue);
            }
          }}
        >
          <Button icon={<FilterRegular />} shape="circular">Add Filter</Button>
        </FilterPopover>
      </div>
    </Toolbar>
  );
}
