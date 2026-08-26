import {
  Button,
  Field,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import {
  ArrowRight20Regular,
  ArrowUpload20Regular,
  DocumentCheckmark20Regular,
} from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnboarding.types";

interface DataConversionStepProps {
  onNext: () => Promise<void>;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  badge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase600,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  compactUploadCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "14px 16px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    cursor: "pointer",
    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",
    gap: "6px",
    ":hover": {
      border: `1px solid ${tokens.colorBrandStroke1}`,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  compactUploadCardSelected: {
    border: `1px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cardLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  statusText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  statusTextSelected: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  hiddenInput: {
    display: "none",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  nextButton: {
    minWidth: "120px",
  },
});

type DataConversionFieldKey = keyof PracticeOnboardingData["dataConversion"];

const conversionFields: { key: DataConversionFieldKey; label: string }[] = [
  { key: "contacts", label: "Contacts" },
  { key: "users", label: "Users" },
  { key: "receipts", label: "Receipts" },
  { key: "businesses", label: "Businesses" },
  { key: "creditNotes", label: "Credit Notes" },
  { key: "tasks", label: "Tasks" },
  { key: "subscriptionAndDd", label: "Subscription & Direct Debit" },
  { key: "invoices", label: "Invoices" },
];

function DataConversionStep({ onNext }: DataConversionStepProps) {
  const styles = useStyles();

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PracticeOnboardingData>();

  const dataConversionValues = watch("dataConversion");
  const dataConversionErrors = errors.dataConversion;

  const handleFileChange = (
    field: DataConversionFieldKey,
    file: File | null,
  ) => {
    setValue(`dataConversion.${field}`, file, {
      shouldValidate: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 5 of 6</span>
        <Text as="h2" className={styles.title}>
          Data Conversion
        </Text>
        <Text className={styles.description}>
          Upload your existing data files for seamless workspace data migration.
        </Text>
      </div>

      <div className={styles.grid}>
        {conversionFields.map(({ key, label }) => {
          const selectedFile = dataConversionValues?.[key];
          const error = dataConversionErrors?.[key];
          const inputId = `data-conversion-${key}-input`;

          return (
            <Field
              key={key}
              validationMessage={error?.message}
              validationState={error ? "error" : "none"}
            >
              <label
                htmlFor={inputId}
                className={`${styles.compactUploadCard} ${
                  selectedFile ? styles.compactUploadCardSelected : ""
                }`}
              >
                <div className={styles.cardTopRow}>
                  <span className={styles.cardLabel}>{label}</span>
                  {selectedFile ? (
                    <DocumentCheckmark20Regular
                      color={tokens.colorBrandForeground1}
                    />
                  ) : (
                    <ArrowUpload20Regular
                      color={tokens.colorNeutralForeground3}
                    />
                  )}
                </div>

                <span
                  className={`${styles.statusText} ${
                    selectedFile ? styles.statusTextSelected : ""
                  }`}
                >
                  {selectedFile
                    ? `✓ ${selectedFile.name}`
                    : "Click to attach file"}
                </span>
              </label>
              <input
                id={inputId}
                type="file"
                className={styles.hiddenInput}
                onChange={(e) =>
                  handleFileChange(key, e.target.files?.[0] ?? null)
                }
              />
            </Field>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Button
          type="button"
          appearance="primary"
          icon={<ArrowRight20Regular />}
          iconPosition="after"
          className={styles.nextButton}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default DataConversionStep;
