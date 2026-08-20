import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Routes } from "react-router-dom";

const useStyles = makeStyles({
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  body: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
  },

  sidebar: {
    width: "220px",
    flexShrink: 0,
    overflow: "hidden",
  },

  sidebarClosed: {
    width: "0",
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

  return (
    <div className={styles.app}>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className={styles.body}>
        <div className={isSidebarOpen ? styles.sidebar : styles.sidebarClosed}>
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        <main className={styles.content}>
          <Routes>{/* Pages go here */}</Routes>
        </main>
      </div>
    </div>
  );
}
