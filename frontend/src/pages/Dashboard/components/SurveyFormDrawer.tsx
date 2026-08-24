import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { Dismiss24Regular, Save24Regular } from "@fluentui/react-icons";
import { useForm } from "react-hook-form";
import type { CreateSurveyPayload } from "../../../types/survey";
import { createSurvey } from "../../../api/surveyApi";

const useStyles = makeStyles({
  drawer: {
    width: "560px",
    maxWidth: "100vw",
  },

  header: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },

  body: {
    padding: "20px 24px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 16px",
    width: "100%",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },

  field: {
    width: "100%",
  },

  fullWidthField: {
    gridColumn: "1 / -1",
    width: "100%",
  },

  input: {
    width: "100%",
  },

  textarea: {
    width: "100%",
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "16px 24px",
  },

  cancelButton: {},

  saveButton: {
    backgroundColor: "#d83b01",
    color: "#ffffff",
    ":hover": {
      backgroundColor: "#c43102",
      color: "#ffffff",
    },
    ":hover:active": {
      backgroundColor: "#a82a02",
      color: "#ffffff",
    },
  },
});

type SurveyFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSurveyCreated: () => void;
};

export function SurveyFormDrawer({
  open,
  onOpenChange,
  onSurveyCreated,
}: SurveyFormDrawerProps) {
  const styles = useStyles();

  const { register, handleSubmit, reset } = useForm<CreateSurveyPayload>();

  async function onSubmit(data: CreateSurveyPayload) {
    try {
      await createSurvey(data);

      reset();
      onSurveyCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create survey:", error);
    }
  }

  return (
    <>
    <Drawer
    separator
      position="end"
      open={open}
      onOpenChange={(_, { open }) => onOpenChange(open)}
      className={styles.drawer}
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              icon={<Dismiss24Regular />}
            />
          }
        >
          Add Survey
        </DrawerHeaderTitle>
      </DrawerHeader>
      {/* <Divider /> */}

      <DrawerBody className={styles.body}>
        <form
          id="survey-form"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field label="User Name" className={styles.field}>
            <Input className={styles.input} {...register("userName")} />
          </Field>
          {/* Row 1: [ Rating ] [ User Name ] */}
          <Field label="Rating" className={styles.field}>
            <Input
              type="number"
              className={styles.input}
              {...register("rating", {
                valueAsNumber: true,
              })}
            />
          </Field>

          {/* Row 2: [ Accountant Name ] [ Business Name ] */}
          <Field label="Accountant Name" className={styles.field}>
            <Input className={styles.input} {...register("accountantName")} />
          </Field>

          <Field label="Business Name" className={styles.field}>
            <Input className={styles.input} {...register("businessName")} />
          </Field>

          {/* Row 3: [ Feedback — full width ] */}
          <Field label="Feedback" className={styles.fullWidthField}>
            <Textarea
              rows={4}
              className={styles.textarea}
              {...register("feedback")}
            />
          </Field>
        </form>
      </DrawerBody>

      {/* <Divider /> */}
      <hr/>
      <DrawerFooter className={styles.footer} >

        <Button
          appearance="outline"
          onClick={() => onOpenChange(false)}
          icon={<Dismiss24Regular />}
          className={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="survey-form"
          icon={<Save24Regular />}
          className={styles.saveButton}
        >
          Save
        </Button>
      </DrawerFooter>
    </Drawer>
    </>
  );
}
