// utils/downloadCsv.ts
import type { Survey } from "../types/survey";

export function downloadSurveysCsv(surveys: Survey[]) {
  const headers = [
    "S.No",
    "User Name",
    "Accountant Name",
    "Business Name",
    "Rating",
    "Feedback",
    "Status",
    "Created At",
  ];

  const rows = surveys.map((survey, index) => [
    index + 1,
    survey.userName,
    survey.accountantName,
    survey.businessName,
    survey.rating,
    survey.feedback,
    survey.status,
    survey.createdAt,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "surveys.csv";

  link.click();

  URL.revokeObjectURL(url);
}