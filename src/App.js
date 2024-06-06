import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { useEffect } from "react";
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

  // const UserContext = createContext();

  return (
    // <div className="App">
    //   <CookiesProvider>
    //     <UserContext.Provider
    //       value={{}}
    //     >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    //     </UserContext.Provider>
    //   </CookiesProvider>
    // </div>
  );
}

export default App;
