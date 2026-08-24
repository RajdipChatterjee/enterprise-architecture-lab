import {
  Button,
  Dropdown,
  Option,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import {
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: "border-box",
    width: "100%",
    gap: tokens.spacingHorizontalM,
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },

  label: {
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },

  dropdown: {
    minWidth: "80px",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },

  pageInfo: {
    padding: `0 ${tokens.spacingHorizontalM}`,
  },
});

type PaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function Pagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Text className={styles.label}>
          Rows per page:
        </Text>

        <Dropdown
          value={pageSize.toString()}
          aria-label="Rows per page"
          className={styles.dropdown}
          onOptionSelect={(_, data) => {
            if (data.optionValue) {
              onPageSizeChange(Number(data.optionValue));
            }
          }}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Dropdown>
      </div>

      <div className={styles.rightSection}>
        <Button
          appearance="subtle"
          icon={<ChevronLeft20Regular />}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <Text className={styles.pageInfo}>
          Page {page} of {totalPages}
        </Text>

        <Button
          appearance="subtle"
          icon={<ChevronRight20Regular />}
          iconPosition="after"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}