import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div>
      
     <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>

    </div>
  
  );
}

export default App;
