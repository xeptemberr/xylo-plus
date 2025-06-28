import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Join from "./auth/Join";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import JoinComplete from "./auth/Complete";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/join" element={<Join />} />
          <Route path="/auth/complete" element={<JoinComplete />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
