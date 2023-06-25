import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import "./App.css";
import PasswordForm from "./PasswordForm";
import TeamPoints from "./TeamPoints";
import Trading from "./Trading";

const App = () => {
  const [token, setToken] = useState(null);

  const handleTokenChange = (newToken) => {
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PasswordForm setToken={handleTokenChange} />}
        />
        <Route
          path="/komandas"
          element={<TeamPoints token={token} />}
        />
        <Route path="/tirdzins" element={<Trading token={token}/>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
