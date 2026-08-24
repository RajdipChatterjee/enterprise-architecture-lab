import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  // NavSectionHeader,
  Tooltip,
  makeStyles,
  mergeClasses,
} from "@fluentui/react-components";

import { Home20Regular, ClipboardTask20Regular } from "@fluentui/react-icons";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const useStyles = makeStyles({
  drawer: {
    height: "100%",
    transitionProperty: "width",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
    overflow: "hidden",
  },
  open: {
    width: "220px",
  },
  closed: {
    width: "50px",
  },
});

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const styles = useStyles();

  return (
    <NavDrawer
      open={isOpen}
      type="inline"
      className={mergeClasses(
        styles.drawer,
        isOpen ? styles.open : styles.closed
      )}
    >
      <NavDrawerHeader>
        <Tooltip content="Toggle sidebar" relationship="label">
          <Hamburger onClick={onToggle} />
        </Tooltip>
      </NavDrawerHeader>

      <NavDrawerBody>
        <NavItem icon={<Home20Regular />} value="dashboard">
          {isOpen && "Dashboard"}
        </NavItem>

        {/* {isOpen && <NavSectionHeader>Operations</NavSectionHeader>} */}

        <NavItem icon={<ClipboardTask20Regular />} value="surveys">
          {isOpen && "Surveys"}
        </NavItem>
      </NavDrawerBody>
    </NavDrawer>
  );
}
