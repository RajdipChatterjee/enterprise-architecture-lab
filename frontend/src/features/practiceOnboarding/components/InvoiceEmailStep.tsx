import {
  Button,
  Field,
  Input,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import {
  ArrowRight20Regular,
  ArrowUpload24Regular,
  DocumentCheckmark24Regular,
} from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnboarding.types";

interface InvoiceEmailStepProps {
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
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "block",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  uploadCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 16px",
    border: `2px dashed ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    cursor: "pointer",
    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",
    gap: "8px",
    textAlign: "center",
    marginBottom: "16px",
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

function InvoiceEmailStep({ onNext }: InvoiceEmailStepProps) {
  const styles = useStyles();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PracticeOnboardingData>();

  const invoiceSampleFile = watch("invoiceSample");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 4 of 6</span>
        <Text as="h2" className={styles.title}>
          Invoice & Email
        </Text>
        <Text className={styles.description}>
          Configure invoice branding settings and public email communications.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Invoice Configuration</Text>

        <Field
          label="Invoice Sample"
          validationMessage={errors.invoiceSample?.message}
          validationState={errors.invoiceSample ? "error" : "none"}
        >
          <label
            htmlFor="invoice-sample-file-input"
            className={`${styles.uploadCard} ${
              invoiceSampleFile ? styles.uploadCardSelected : ""
            }`}
          >
            {invoiceSampleFile ? (
              <>
                <DocumentCheckmark24Regular
                  color={tokens.colorBrandForeground1}
                />
                <span className={styles.selectedFileName}>
                  ✓ {invoiceSampleFile.name}
                </span>
                <span className={styles.uploadHint}>Click to replace file</span>
              </>
            ) : (
              <>
                <ArrowUpload24Regular color={tokens.colorBrandForeground1} />
                <span className={styles.uploadTitle}>
                  Upload Sample Invoice
                </span>
                <span className={styles.uploadHint}>
                  PDF or Image file (max 10MB)
                </span>
              </>
            )}
          </label>
          <input
            id="invoice-sample-file-input"
            type="file"
            accept=".pdf,image/*"
            className={styles.hiddenInput}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setValue("invoiceSample", file, {
                shouldValidate: true,
              });
            }}
          />
        </Field>

        <div className={styles.grid}>
          <Field
            label="Invoice Header"
            validationMessage={errors.invoiceHeader?.message}
            validationState={errors.invoiceHeader ? "error" : "none"}
          >
            <Input
              placeholder="e.g. Acro Dental - Official Invoice"
              {...register("invoiceHeader")}
            />
          </Field>

          <Field
            label="Invoice Footer"
            validationMessage={errors.invoiceFooter?.message}
            validationState={errors.invoiceFooter ? "error" : "none"}
          >
            <Input
              placeholder="e.g. Thank you for choosing Acro Dental!"
              {...register("invoiceFooter")}
            />
          </Field>
        </div>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Public Contact</Text>
        <div className={styles.grid}>
          <Field
            label="Public Email"
            validationMessage={errors.publicEmail?.message}
            validationState={errors.publicEmail ? "error" : "none"}
          >
            <Input
              type="email"
              placeholder="billing@example.com"
              {...register("publicEmail")}
            />
          </Field>
        </div>
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

export default InvoiceEmailStep;
