import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(window.location.pathname.split('/')[1] + '/environment.json').then((r) =>
      r.json().then((data) => {
        window.publicUrl = data.publicUrl;
      }),
    );
  }, []);

  return <HomePage />;
}

export default App;
