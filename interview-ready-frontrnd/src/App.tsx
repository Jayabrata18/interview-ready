
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Example1 from "./Signin";
import Example2 from "./Example2";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/example1" element={<Example1 />}></Route>
        <Route path="/example2" element={<Example2 />}></Route>
        {/* <Route path="/create"></Route> */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
