import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

import "./Signin.css";
import axios from "axios";
interface SignInFormData {
  email: string;
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [token, setToken] = useLocalStorage("token", "");
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form submitted with data:", formData);
    try {
      await axios
        .post("http://localhost:3000/api/v1/user/signin", formData, {
          // withCredentials: true,
        })
        .then((res) => {
          setToken(res.data);
          localStorage.setItem("token", res.data);
          // console.log(setToken);
        });
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
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
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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
