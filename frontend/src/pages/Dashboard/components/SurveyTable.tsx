import * as React from "react";

import {
  DataGridBody,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGrid,
  DataGridCell,
  type TableColumnDefinition,
  createTableColumn,
  TableCellLayout,
} from "@fluentui/react-components";
import type { Survey } from "../../../types/survey";
import { getSurveys } from "../../../api/surveyApi";
import { useEffect } from "react";

interface SurveyTableProps {
  refreshKey: number;
}

const getColumns = (items: Survey[]): TableColumnDefinition<Survey>[] => [
  createTableColumn<Survey>({
    columnId: "sNo",

    renderHeaderCell: () => "S.No.",

    renderCell: (item) => (
      <TableCellLayout>{items.indexOf(item) + 1}</TableCellLayout>
    ),
  }),

  createTableColumn<Survey>({
    columnId: "userName",

    compare: (a, b) => a.userName.localeCompare(b.userName),

    renderHeaderCell: () => "User Name",

    renderCell: (item) => <TableCellLayout>{item.userName}</TableCellLayout>,
  }),

  createTableColumn<Survey>({
    columnId: "accountantName",

    compare: (a, b) => a.accountantName.localeCompare(b.accountantName),

    renderHeaderCell: () => "Accountant Name",

    renderCell: (item) => (
      <TableCellLayout>{item.accountantName}</TableCellLayout>
    ),
  }),

  createTableColumn<Survey>({
    columnId: "businessName",

    compare: (a, b) => a.businessName.localeCompare(b.businessName),

    renderHeaderCell: () => "Business Name",

    renderCell: (item) => (
      <TableCellLayout>{item.businessName}</TableCellLayout>
    ),
  }),

  createTableColumn<Survey>({
    columnId: "rating",

    compare: (a, b) => a.rating - b.rating,

    renderHeaderCell: () => "Rating",

    renderCell: (item) => <TableCellLayout>{item.rating}</TableCellLayout>,
  }),

  createTableColumn<Survey>({
    columnId: "feedback",

    compare: (a, b) => a.feedback.localeCompare(b.feedback),

    renderHeaderCell: () => "Feedback",

    renderCell: (item) => <TableCellLayout>{item.feedback}</TableCellLayout>,
  }),

  createTableColumn<Survey>({
    columnId: "status",

    compare: (a, b) => a.status.localeCompare(b.status),

    renderHeaderCell: () => "Status",

    renderCell: (item) => <TableCellLayout>{item.status}</TableCellLayout>,
  }),

  createTableColumn<Survey>({
    columnId: "createdAt",

    compare: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),

    renderHeaderCell: () => "Created At",

    renderCell: (item) => (
      <TableCellLayout>
        {new Date(item.createdAt).toLocaleDateString()}
      </TableCellLayout>
    ),
  }),
];

export function SurveyTable({ refreshKey }: SurveyTableProps) {
  const [items, setItems] = React.useState<Survey[]>([]);

  const columns = React.useMemo(() => getColumns(items), [items]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await getSurveys();

      setItems(response.data.items);
    };

    fetchSurveys();
  }, [refreshKey]);

  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.id}
      focusMode="composite"
      style={{ minWidth: "550px" }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<Survey>>
        {({ item, rowId }) => (
          <DataGridRow<Survey> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}
