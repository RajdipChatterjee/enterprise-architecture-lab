import {
  Button,
  Input,
  makeStyles,
} from "@fluentui/react-components";

import {
  Navigation24Regular,
  Search24Regular,
  Apps24Regular,
  Megaphone24Regular,
  Bookmark24Regular,
  Headphones24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e43d19",
    color: "white",
    flexShrink: 0,
  },

  menuButton: {
    color: "white",
  },

  title: {
    fontWeight: "600",
    fontSize: "16px",
    marginLeft: "8px",
    minWidth: "180px",
  },

  search: {
    width: "250px",
  },

  spacer: {
    flexGrow: 1,
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    paddingRight: "12px",
  },

  actionButton: {
    color: "white",
  },
});

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={styles.header}>

      {/* Hamburger */}
      <Button
        appearance="transparent"
        icon={<Navigation24Regular />}
        onClick={onMenuClick}
        className={styles.menuButton}
      />

      {/* Title */}
      <div className={styles.title}>
        Acting Office 2
      </div>

      {/* Search */}
      <Input
        className={styles.search}
        contentBefore={<Search24Regular />}
        placeholder="Ctrl + K"
      />

      <div className={styles.spacer} />

      {/* Right actions */}
      <div className={styles.actions}>
        <Button
          appearance="transparent"
          icon={<Apps24Regular />}
          className={styles.actionButton}
        />

        <Button
          appearance="transparent"
          icon={<Megaphone24Regular />}
          className={styles.actionButton}
        />

        <Button
          appearance="transparent"
          icon={<Bookmark24Regular />}
          className={styles.actionButton}
        />

        <Button
          appearance="transparent"
          icon={<Headphones24Regular />}
          className={styles.actionButton}
        />
      </div>

    </header>
  );
}