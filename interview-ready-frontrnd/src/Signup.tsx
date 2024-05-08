import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [isChecked, setIsChecked] = useState(false);
 const [formData, setFormData] = useState<SignUpFormData>({
   name: "",
   email: "",
   password: "",
 });
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     console.log("Form submitted with data:", formData);
   };
  // axios.defaults.withCredentials = true;
  // const handleCheckboxChange = (event: any) => {
  //   setIsChecked(event.target.checked);
  // };
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="app" data-theme={theme}>
      <div className="signup">
        <h1>Signup</h1>
        <div className="container">
          {/* <div className="top">
            <i className="fab fa-google" aria-hidden="true"></i>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-twitter-square"></i>
            <i className="fab fa-apple"></i>
          </div>
          <p className="divider">
            <span>Or</span>
          </p> */}
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              pattern="[a-zA-Z]+"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* <div className="remember">
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                // onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox">
                <p>Remember Me</p>
              </label>
            </div> */}
            <button>Sign Up</button>
          </form>
          <div className="bottom">
            <p>Forgot your password?</p>
            <a href="/">Reset Password</a>
          </div>
          <a href="/signin" className="create">
            Already Have Account Signin Here!
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

export default Signup;
