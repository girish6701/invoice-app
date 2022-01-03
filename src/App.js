import React, { useState } from "react";
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [theme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("theme") || false)
  );
  localStorage.setItem("theme", theme);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<PageOne theme={theme} setDarkTheme={setDarkTheme} />}
          />
          <Route
            path="/info"
            element={<PageTwo theme={theme} setDarkTheme={setDarkTheme} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
