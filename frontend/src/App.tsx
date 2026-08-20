import { BrowserRouter, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
      <Routes>
        {/* We'll add pages here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;