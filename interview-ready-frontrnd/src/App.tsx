
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Signup />}></Route>

        <Route path="/signin" element={<Signin />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
