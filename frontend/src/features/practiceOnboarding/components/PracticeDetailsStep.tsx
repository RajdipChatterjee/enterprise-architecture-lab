import { Button, Field, Input, makeStyles, tokens, Text } from "@fluentui/react-components";
import { ArrowRight20Regular } from "@fluentui/react-icons";
import { useFormContext } from "react-hook-form";

import type { PracticeOnboardingData } from "../types/practiceOnborading.types";

interface PracticeDetailsStepProps {
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

function PracticeDetailsStep({ onNext }: PracticeDetailsStepProps) {
  const styles = useStyles();

  const {
    register,
    formState: { errors },
  } = useFormContext<PracticeOnboardingData>();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Step 1 of 6</span>
        <Text as="h2" className={styles.title}>
          Practice Details
        </Text>
        <Text className={styles.description}>
          Tell us about the practice you want to set up.
        </Text>
      </div>

      <div className={styles.grid}>
        <Field
          label="Practice Name"
          validationMessage={errors.practiceName?.message}
          validationState={errors.practiceName ? "error" : "none"}
        >
          <Input
            placeholder="Enter your practice name"
            {...register("practiceName", {
              required: "Practice name is required",
            })}
          />
        </Field>

        <Field
          label="Proposed URL"
          validationMessage={errors.proposedUrl?.message}
          validationState={errors.proposedUrl ? "error" : "none"}
        >
          <Input
            placeholder="your-practice"
            {...register("proposedUrl", {
              required: "Proposed URL is required",
            })}
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

export default PracticeDetailsStep;