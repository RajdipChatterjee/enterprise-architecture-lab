import { Button, Field, makeStyles, tokens, Text } from "@fluentui/react-components";
import { ArrowRight20Regular, ArrowUpload24Regular, DocumentCheckmark24Regular } from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnborading.types";

interface BrandingStepProps {
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  uploadCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    border: `2px dashed ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    cursor: "pointer",
    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",
    gap: "8px",
    textAlign: "center",
    ":hover": {
      border: `2px dashed ${tokens.colorBrandStroke1}`,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  uploadCardSelected: {
    border: `2px dashed ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  uploadTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  uploadHint: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  selectedFileName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    wordBreak: "break-all",
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

function BrandingStep({ onNext }: BrandingStepProps) {
  const styles = useStyles();

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PracticeOnboardingData>();

  const logoFile = watch("logo");
  const faviconFile = watch("favicon");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 2 of 6</span>
        <Text as="h2" className={styles.title}>
          Branding
        </Text>
        <Text className={styles.description}>
          Upload your practice logo and favicon to customize your workspace.
        </Text>
      </div>

      <div className={styles.grid}>
        <Field
          label="Logo"
          validationMessage={errors.logo?.message}
          validationState={errors.logo ? "error" : "none"}
        >
          <label
            htmlFor="logo-file-input"
            className={`${styles.uploadCard} ${
              logoFile ? styles.uploadCardSelected : ""
            }`}
          >
            {logoFile ? (
              <>
                <DocumentCheckmark24Regular color={tokens.colorBrandForeground1} />
                <span className={styles.selectedFileName}>✓ {logoFile.name}</span>
                <span className={styles.uploadHint}>Click to replace file</span>
              </>
            ) : (
              <>
                <ArrowUpload24Regular color={tokens.colorBrandForeground1} />
                <span className={styles.uploadTitle}>Upload Logo</span>
                <span className={styles.uploadHint}>PNG, JPG or SVG (max 5MB)</span>
              </>
            )}
          </label>
          <input
            id="logo-file-input"
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setValue("logo", file, {
                shouldValidate: true,
              });
            }}
          />
        </Field>

        <Field
          label="Favicon"
          validationMessage={errors.favicon?.message}
          validationState={errors.favicon ? "error" : "none"}
        >
          <label
            htmlFor="favicon-file-input"
            className={`${styles.uploadCard} ${
              faviconFile ? styles.uploadCardSelected : ""
            }`}
          >
            {faviconFile ? (
              <>
                <DocumentCheckmark24Regular color={tokens.colorBrandForeground1} />
                <span className={styles.selectedFileName}>✓ {faviconFile.name}</span>
                <span className={styles.uploadHint}>Click to replace file</span>
              </>
            ) : (
              <>
                <ArrowUpload24Regular color={tokens.colorBrandForeground1} />
                <span className={styles.uploadTitle}>Upload Favicon</span>
                <span className={styles.uploadHint}>ICO, PNG or SVG (max 2MB)</span>
              </>
            )}
          </label>
          <input
            id="favicon-file-input"
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setValue("favicon", file, {
                shouldValidate: true,
              });
            }}
          />
        </Field>
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

export default BrandingStep;