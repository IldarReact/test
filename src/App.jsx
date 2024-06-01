// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import TablePage from "./components/TablePage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TablePage/:id" element={<TablePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
