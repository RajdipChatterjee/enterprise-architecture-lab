import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  makeStyles,
} from "@fluentui/react-components";
import { Dismiss24Regular, Save24Regular } from "@fluentui/react-icons";
import { useForm } from "react-hook-form";
import type { CreateSurveyPayload } from "../../../types/survey";
import { createSurvey } from "../../../api/surveyApi";

const useStyles = makeStyles({
  drawer: {
    width: "100%",
  },

  noSpacing: {
    margin: 0,
    padding: 0,
  },

  spacer: {
    flexGrow: 1,
  },

  red: {
    backgroundColor: "red",
    color: "white",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
});

type SurveyFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SurveyFormDrawer({
  open,
  onOpenChange,
}: SurveyFormDrawerProps) {
  const styles = useStyles();

  const { register, handleSubmit, reset } = useForm<CreateSurveyPayload>();

  async function onSubmit(data: CreateSurveyPayload) {
    try {
      await createSurvey(data);

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create survey:", error);
    }
  }

  return (
    <Drawer
      type="overlay"
      position="end"
      className={styles.noSpacing}
      open={open}
      onOpenChange={(_, { open }) => onOpenChange(open)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle>Default drawer</DrawerHeaderTitle>
        <Button
          appearance="subtle"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          icon={<Dismiss24Regular />}
        />
      </DrawerHeader>
      <Divider />
      <DrawerBody>
        <form
          id="survey-form"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field label="Rating">
            <Input
              type="number"
              {...register("rating", {
                valueAsNumber: true,
              })}
            />
          </Field>

          <Field label="Feedback">
            <Input {...register("feedback")} />
          </Field>

          <Field label="User Name">
            <Input {...register("userName")} />
          </Field>

          <Field label="Accountant Name">
            <Input {...register("accountantName")} />
          </Field>

          <Field label="Business Name">
            <Input {...register("businessName")} />
          </Field>
        </form>
      </DrawerBody>
      <Divider />
      <DrawerFooter>
        <Button onClick={() => onOpenChange(false)} icon={<Dismiss24Regular />}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="survey-form"
          icon={<Save24Regular />}
          className={styles.red}
        >
          Save
        </Button>
      </DrawerFooter>
    </Drawer>
  );
}
