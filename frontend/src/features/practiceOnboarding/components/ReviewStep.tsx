import { Button, makeStyles, tokens, Text } from "@fluentui/react-components";
import { Checkmark20Regular } from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnborading.types";

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
  section: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 20px",
    gap: "12px",
  },
  sectionHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingBottom: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "12px 24px",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  rowLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
  },
  rowValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    wordBreak: "break-word",
  },
  notProvidedBadge: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
    fontStyle: "italic",
  },
  fileBadge: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "12px",
  },
  submitButton: {
    minWidth: "160px",
  },
});

function ReviewStep() {
  const styles = useStyles();
  const { getValues } = useFormContext<PracticeOnboardingData>();
  const data = getValues();

  const renderValue = (val?: string | null) => {
    if (!val || val.trim() === "") {
      return <span className={styles.notProvidedBadge}>Not provided</span>;
    }
    return val;
  };

  const renderFile = (file?: File | null) => {
    if (!file) {
      return <span className={styles.notProvidedBadge}>Not provided</span>;
    }
    return <span className={styles.fileBadge}>✓ {file.name}</span>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 6 of 6</span>
        <Text as="h2" className={styles.title}>
          Review & Complete
        </Text>
        <Text className={styles.description}>
          Please review your practice details before completing setup.
        </Text>
      </div>

      {/* Practice Details */}
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>Practice Details</Text>
        <div className={styles.grid}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Practice Name</span>
            <span className={styles.rowValue}>
              {renderValue(data.practiceName)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Proposed URL</span>
            <span className={styles.rowValue}>
              {renderValue(data.proposedUrl)}
            </span>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>Branding</Text>
        <div className={styles.grid}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Logo</span>
            <span className={styles.rowValue}>{renderFile(data.logo)}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Favicon</span>
            <span className={styles.rowValue}>{renderFile(data.favicon)}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>Contact Information</Text>
        <div className={styles.grid}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Website</span>
            <span className={styles.rowValue}>{renderValue(data.website)}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Practice Phone Number</span>
            <span className={styles.rowValue}>
              {renderValue(data.practicePhoneNumber)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Contact Person Name</span>
            <span className={styles.rowValue}>
              {renderValue(data.contactPersonName)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Contact Person Email</span>
            <span className={styles.rowValue}>
              {renderValue(data.contactPersonEmail)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Contact Person Phone</span>
            <span className={styles.rowValue}>
              {renderValue(data.contactPersonPhoneNumber)}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice & Email */}
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>Invoice & Email</Text>
        <div className={styles.grid}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Invoice Sample</span>
            <span className={styles.rowValue}>
              {renderFile(data.invoiceSample)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Invoice Header</span>
            <span className={styles.rowValue}>
              {renderValue(data.invoiceHeader)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Invoice Footer</span>
            <span className={styles.rowValue}>
              {renderValue(data.invoiceFooter)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Public Email</span>
            <span className={styles.rowValue}>
              {renderValue(data.publicEmail)}
            </span>
          </div>
        </div>
      </div>

      {/* Data Conversion */}
      <div className={styles.section}>
        <Text className={styles.sectionHeader}>Data Conversion Files</Text>
        <div className={styles.grid}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Contacts</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.contacts)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Users</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.users)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Receipts</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.receipts)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Businesses</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.businesses)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Credit Notes</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.creditNotes)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Tasks</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.tasks)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Subscription & DD</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.subscriptionAndDd)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Invoices</span>
            <span className={styles.rowValue}>
              {renderFile(data.dataConversion?.invoices)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          type="submit"
          appearance="primary"
          size="large"
          icon={<Checkmark20Regular />}
          className={styles.submitButton}
        >
          Create Practice
        </Button>
      </div>
    </div>
  );
}

export default ReviewStep;
