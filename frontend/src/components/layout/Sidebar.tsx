import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  Tooltip,
} from "@fluentui/react-components";

import { Home20Regular, ClipboardTask20Regular } from "@fluentui/react-icons";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <NavDrawer
      open={isOpen}
      type="inline"
      style={{
        width: isOpen ? "220px" : "50px",
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
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

        {isOpen && <NavSectionHeader>Operations</NavSectionHeader>}

        <NavItem icon={<ClipboardTask20Regular />} value="surveys">
          {isOpen && "Surveys"}
        </NavItem>
      </NavDrawerBody>
    </NavDrawer>
  );
}
