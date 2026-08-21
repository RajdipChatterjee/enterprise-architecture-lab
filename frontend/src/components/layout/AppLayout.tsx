import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const useStyles = makeStyles({
  app: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  body: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
  },

  content: {
    flexGrow: 1,
    overflow: "auto",
    padding: "20px",
  },
});

export function AppLayout() {
  const styles = useStyles();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  return (
    <div className={styles.app}>
      <Header onMenuClick={toggleSidebar} />

      <div className={styles.body}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}