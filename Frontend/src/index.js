import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import PasswordForm from "./PasswordForm";
import TeamPoints from "./TeamPoints";
import Trading from "./Trading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PasswordForm />} />
      <Route path="/komandas" element={<TeamPoints />} />
      <Route path="/tirdzins" element={<Trading />} />
    </Routes>
  </BrowserRouter>
);
