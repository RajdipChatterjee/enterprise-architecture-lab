import {
  Button,
  Field,
  Input,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import { ArrowRight20Regular } from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnboarding.types";

interface ContactInformationStepProps {
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

function ContactInformationStep({ onNext }: ContactInformationStepProps) {
  const styles = useStyles();

  const {
    register,
    formState: { errors },
  } = useFormContext<PracticeOnboardingData>();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 3 of 6</span>
        <Text as="h2" className={styles.title}>
          Contact Information
        </Text>
        <Text className={styles.description}>
          Provide your practice contact details and primary contact person.
        </Text>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Practice Contact</Text>
        <div className={styles.grid}>
          <Field
            label="Website"
            validationMessage={errors.website?.message}
            validationState={errors.website ? "error" : "none"}
          >
            <Input
              placeholder="https://example.com"
              {...register("website")}
            />
          </Field>

          <Field
            label="Practice Phone Number"
            validationMessage={errors.practicePhoneNumber?.message}
            validationState={errors.practicePhoneNumber ? "error" : "none"}
          >
            <Input
              placeholder="+1 (555) 000-0000"
              {...register("practicePhoneNumber")}
            />
          </Field>
        </div>
      </div>

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Primary Contact Person</Text>
        <div className={styles.grid}>
          <Field
            label="Contact Person Name"
            validationMessage={errors.contactPersonName?.message}
            validationState={errors.contactPersonName ? "error" : "none"}
          >
            <Input
              placeholder="Jane Doe"
              {...register("contactPersonName")}
            />
          </Field>

          <Field
            label="Contact Person Email"
            validationMessage={errors.contactPersonEmail?.message}
            validationState={errors.contactPersonEmail ? "error" : "none"}
          >
            <Input
              type="email"
              placeholder="jane@example.com"
              {...register("contactPersonEmail")}
            />
          </Field>

          <Field
            label="Contact Person Phone Number"
            validationMessage={errors.contactPersonPhoneNumber?.message}
            validationState={errors.contactPersonPhoneNumber ? "error" : "none"}
          >
            <Input
              placeholder="+1 (555) 111-2222"
              {...register("contactPersonPhoneNumber")}
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

export default ContactInformationStep;
