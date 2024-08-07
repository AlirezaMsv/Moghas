import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import PanelAdmin from "./pages/PanelAdmin/PanelAdmin";
import "./App.css";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
// import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  useEffect(() => {
    fetch(window.location.pathname.split("/")[1] + "/environment.json").then(
      (r) =>
        r.json().then((data) => {
          window.publicUrl = data.publicUrl;
          localStorage.setItem("publicUrl", data.publicUrl);
        })
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
