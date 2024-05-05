
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Example1 from "./Example1";
import Example2 from "./Example2";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/example1" element={<Example1 />}></Route>
        <Route path="/example2" element={<Example2 />}></Route>
        {/* <Route path="/create"></Route> */}
      </Routes>
    </Router>
  );
};

export default App;
