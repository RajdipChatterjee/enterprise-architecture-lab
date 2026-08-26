import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import { Checkmark16Filled } from "@fluentui/react-icons";

interface OnboardingStepperProps {
  currentStep: number;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 0",
    boxSizing: "border-box",
    overflowX: "auto",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 0px",
    minWidth: "80px",
    position: "relative",
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  connectorLine: {
    flex: "1",
    height: "2px",
    backgroundColor: tokens.colorNeutralStroke2,
    transitionProperty: "background-color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",
  },
  connectorLineHidden: {
    visibility: "hidden",
  },
  connectorLineCompleted: {
    backgroundColor: tokens.colorBrandBackground,
  },
  checkpoint: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
    boxSizing: "border-box",
    transitionProperty: "all",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",
  },
  checkpointCompleted: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    border: `2px solid ${tokens.colorBrandBackground}`,
  },
  checkpointCurrent: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandForeground1,
    border: `3px solid ${tokens.colorBrandStroke1}`,
    boxShadow: `0 0 0 4px ${tokens.colorBrandBackground2}`,
    fontWeight: tokens.fontWeightBold,
  },
  checkpointUpcoming: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
  },
  label: {
    marginTop: "8px",
    textAlign: "center",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    margin: "8px 0 0 0",
    wordBreak: "break-word",
    maxWidth: "110px",
  },
  labelCompleted: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  labelCurrent: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  labelUpcoming: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
  },
});

const OnboardingStepper = ({ currentStep }: OnboardingStepperProps) => {
  const styles = useStyles();

  const steps = [
    "Practice Details",
    "Branding",
    "Contact Information",
    "Invoice & Email",
    "Data Conversion",
    "Review",
  ];

  return (
    <div className={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        const checkpointClass = isCompleted
          ? styles.checkpointCompleted
          : isCurrent
          ? styles.checkpointCurrent
          : isUpcoming
          ? styles.checkpointUpcoming
          : styles.checkpointUpcoming;

        const labelClass = isCompleted
          ? styles.labelCompleted
          : isCurrent
          ? styles.labelCurrent
          : isUpcoming
          ? styles.labelUpcoming
          : styles.labelUpcoming;

        const leftLineClass =
          index === 0
            ? styles.connectorLineHidden
            : stepNumber <= currentStep
            ? mergeClasses(styles.connectorLine, styles.connectorLineCompleted)
            : styles.connectorLine;

        const rightLineClass =
          index === steps.length - 1
            ? styles.connectorLineHidden
            : stepNumber < currentStep
            ? mergeClasses(styles.connectorLine, styles.connectorLineCompleted)
            : styles.connectorLine;

        return (
          <div key={step} className={styles.stepItem}>
            <div className={styles.topRow}>
              <div className={leftLineClass} />
              <div className={mergeClasses(styles.checkpoint, checkpointClass)}>
                {isCompleted ? <Checkmark16Filled /> : stepNumber}
              </div>
              <div className={rightLineClass} />
            </div>

            <p className={mergeClasses(styles.label, labelClass)}>{step}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingStepper;