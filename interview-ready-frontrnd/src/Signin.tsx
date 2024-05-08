import React, { useState } from "react";
import useLocalStorage from "use-local-storage";

import "./Signin.css";

const Signin = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [isChecked, setIsChecked] = useState(false);
  // const [formData, setFormData] = useState<any[]>([]);
    const [formData, setFormData] = useState<{ email: string, password: string }>({ email: "", password: "" });

   const changeHandler = (event: any) => {
     setFormData((prevFormData) => ({
       ...prevFormData,
       [event.target.name]: event.target.value,
     }));
     console.log(formData);
   };
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="app" data-theme={theme}>
      <div className="signin">
        <h1>Signin</h1>
        <div className="container">
          <div className="top">
            <i className="fab fa-google" aria-hidden="true"></i>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-twitter-square"></i>
            <i className="fab fa-apple"></i>
          </div>
          <p className="divider">
            <span>Or</span>
          </p>
          <form>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              // onChange={changeHandler}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              // onChange={changeHandler}
            />
            <div className="remember">
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox">
                <p>Remember Me</p>
              </label>
            </div>
            <button>Sign In</button>
          </form>
          <div className="bottom">
            <p>Forgot your password?</p>
            <a href="/">Reset Password</a>
          </div>
          <a href="/signup" className="create">
            Dont Have Account Signup Here!
          </a>
        </div>
        <div className="theme-toggle">
          {theme === "light" ? <h2>Light Theme</h2> : <h2>Dark Theme</h2>}
          {theme === "light" ? (
            <i onClick={switchTheme} className="fas fa-toggle-on"></i>
          ) : (
            <i onClick={switchTheme} className="fas fa-toggle-off"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
