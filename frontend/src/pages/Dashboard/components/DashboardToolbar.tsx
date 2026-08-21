import {
  Button,
  Input,
  makeStyles,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";

import {
  AddRegular,
  ArrowDownloadRegular,
  ArrowSyncRegular,
  FilterRegular,
  SearchRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  toolbar: {
    width: "100%",
  },

  spacer: {
    flexGrow: 1,
  },
});

type DashboardToolbarProps = {
  openForm: () => void;
};

export function DashboardToolbar({ openForm }: DashboardToolbarProps) {
  const styles = useStyles();

  return (
    <Toolbar aria-label="Dashboard Toolbar" className={styles.toolbar}>
      <div>
        <ToolbarButton icon={<AddRegular />} onClick={openForm}>
          Add Survey
        </ToolbarButton>
        <ToolbarButton icon={<ArrowSyncRegular />}>Refresh</ToolbarButton>
        <ToolbarButton icon={<ArrowDownloadRegular />}>Download</ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className={styles.spacer} />

      <div>
        <Input contentBefore={<SearchRegular />} placeholder="Search" />

        <Button>Status: Active</Button>

        <Button icon={<FilterRegular />}>Add Filter</Button>
      </div>
    </Toolbar>
  );
}
