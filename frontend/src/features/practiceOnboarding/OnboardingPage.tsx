import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { makeStyles, tokens, Text } from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { practiceOnboardingSchema } from "./schemas/practiceOnboarding.schema";

import initialPracticeOnboardingData from "./constants/initialPracticeOnboardingData";
import type { PracticeOnboardingData } from "./types/practiceOnboarding.types";
import { createPractice } from "../../api/practiceApi";

import PracticeDetailsStep from "./components/PracticeDetailsStep";
import BrandingStep from "./components/BrandingStep";
import ContactInformationStep from "./components/ContactInformationStep";
import InvoiceEmailStep from "./components/InvoiceEmailStep";
import DataConversionStep from "./components/DataConversionStep";
import ReviewStep from "./components/ReviewStep";
import OnboardingStepper from "./components/OnboardingStepper";

const useStyles = makeStyles({
  pageContainer: {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "24px 16px 48px 16px",
    boxSizing: "border-box",
  },
  headerSection: {
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block",
    lineHeight: tokens.lineHeightHero700,
  },
  pageSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginTop: "4px",
    display: "block",
  },
  stepperContainer: {
    marginBottom: "32px",
    padding: "16px 20px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
    padding: "32px 36px",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "20px 16px",
    },
  },
});

function OnboardingPage() {
  const styles = useStyles();

  const form = useForm<PracticeOnboardingData>({
    resolver: zodResolver(practiceOnboardingSchema),
    defaultValues: initialPracticeOnboardingData,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = async () => {
    let fieldsToValidate;

    if (currentStep === 1) {
      fieldsToValidate = ["practiceName", "proposedUrl"] as const;
    }

    if (currentStep === 2) {
      fieldsToValidate = ["logo", "favicon"] as const;
    }

    if (currentStep === 3) {
      fieldsToValidate = [
        "website",
        "practicePhoneNumber",
        "contactPersonName",
        "contactPersonEmail",
        "contactPersonPhoneNumber",
      ] as const;
    }

    if (currentStep === 4) {
      fieldsToValidate = [
        "invoiceSample",
        "invoiceHeader",
        "invoiceFooter",
        "publicEmail",
      ] as const;
    }

    if (currentStep === 5) {
      fieldsToValidate = [
        "dataConversion.contacts",
        "dataConversion.users",
        "dataConversion.receipts",
        "dataConversion.businesses",
        "dataConversion.creditNotes",
        "dataConversion.tasks",
        "dataConversion.subscriptionAndDd",
        "dataConversion.invoices",
      ] as const;
    }

    if (!fieldsToValidate) {
      return;
    }

    const isValid = await form.trigger(fieldsToValidate as any);

    if (!isValid) {
      return;
    }

    setCurrentStep((previousStep) => previousStep + 1);
  };

  async function onSubmit(data: PracticeOnboardingData) {
    try {
      const response = await createPractice(data);

      console.log("Practice created successfully:", response);
    } catch (error) {
      console.error("Failed to create practice:", error);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <Text as="h1" className={styles.pageTitle}>
          Practice Onboarding
        </Text>
        <Text className={styles.pageSubtitle}>
          Set up your practice and configure your workspace.
        </Text>
      </div>

      <div className={styles.stepperContainer}>
        <OnboardingStepper currentStep={currentStep} />
      </div>

      <div className={styles.formCard}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 1 && <PracticeDetailsStep onNext={nextStep} />}
            {currentStep === 2 && <BrandingStep onNext={nextStep} />}
            {currentStep === 3 && <ContactInformationStep onNext={nextStep} />}
            {currentStep === 4 && <InvoiceEmailStep onNext={nextStep} />}
            {currentStep === 5 && <DataConversionStep onNext={nextStep} />}
            {currentStep === 6 && <ReviewStep />}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default OnboardingPage;
