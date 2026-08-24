import React from "react";
import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

export interface FilterOption {
  key: string;
  label: string;
}

export interface FilterPopoverProps {
  children: React.ReactElement;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;

  criteriaOptions?: FilterOption[];
  criteria?: string;
  onCriteriaChange?: (criteria: string) => void;

  valueOptions?: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;

  onApply?: () => void;
  onCancel?: () => void;
}

const useStyles = makeStyles({
  surface: {
    padding: tokens.spacingVerticalM,
    width: "280px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    boxSizing: "border-box",
  },

  title: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    marginBottom: tokens.spacingVerticalXS,
  },

  field: {
    width: "100%",
  },

  dropdown: {
    width: "100%",
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },

  screenAnchor: {
    position: "fixed",
    top: "52px",
    left: "10px",
    width: "1px",
    height: "1px",
  },

  primButton: {
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

  anchor: {
    position: "fixed",
    top: "52px",
    left: "10px",
    width: "1px",
    height: "1px",
  },
});

export function FilterPopover({
  children,
  title,
  open,
  onOpenChange,
  criteriaOptions,
  criteria,
  onCriteriaChange,
  valueOptions,
  value,
  onValueChange,
  onApply,
  onCancel,
}: FilterPopoverProps) {
  const styles = useStyles();

  const [anchorElement, setAnchorElement] =
    React.useState<HTMLDivElement | null>(null);

  const selectedCriteriaLabel =
    criteriaOptions?.find((opt) => opt.key === criteria)?.label || criteria;

  const selectedValueLabel =
    valueOptions?.find((opt) => opt.key === value)?.label || value;

  return (
    <>
      <div ref={setAnchorElement} className={styles.anchor} />
      <Popover
        open={open}
        onOpenChange={(_, data) => onOpenChange(data.open)}
        trapFocus
        positioning={{
          target: anchorElement ?? undefined,
          position: "below",
          align: "start",
        }}
      >
        <PopoverTrigger disableButtonEnhancement>{children}</PopoverTrigger>

        <PopoverSurface className={styles.surface}>
          <Text className={styles.title}>{title}</Text>

          {criteriaOptions && criteriaOptions.length > 0 && (
            <Field label="Criteria" className={styles.field}>
              <Dropdown
                value={selectedCriteriaLabel}
                selectedOptions={criteria ? [criteria] : []}
                className={styles.dropdown}
                onOptionSelect={(_, data) => {
                  if (data.optionValue && onCriteriaChange) {
                    onCriteriaChange(data.optionValue);
                  }
                }}
              >
                {criteriaOptions.map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.label}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          )}

          <Field label="Value" className={styles.field}>
            {valueOptions && valueOptions.length > 0 ? (
              <Dropdown
                value={selectedValueLabel}
                selectedOptions={value ? [value] : []}
                className={styles.dropdown}
                onOptionSelect={(_, data) => {
                  if (data.optionValue) {
                    onValueChange(data.optionValue);
                  }
                }}
              >
                {valueOptions.map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.label}
                  </Option>
                ))}
              </Dropdown>
            ) : (
              <Input
                value={value}
                placeholder="Enter value..."
                onChange={(_, data) => onValueChange(data.value)}
              />
            )}
          </Field>

          <div className={styles.footer}>
            <Button
              appearance="secondary"
              onClick={() => {
                if (onCancel) onCancel();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              // appearance="primary"
              className={styles.primButton}
              onClick={() => {
                if (onApply) onApply();
                onOpenChange(false);
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverSurface>
      </Popover>
    </>
  );
}
