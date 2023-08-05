import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiErrorWarningFill } from "react-icons/ri";
import LoaderContainer from "../components/loader components/LoaderContainer";
import "./Form.css";

function LoginPage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    role: "applicant",
  });

  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setLoggingIn(true);
    setError("");
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/login`, payload)
      .then((res) => {
        axios
          .get(`${import.meta.env.VITE_SERVER_URL}/user`, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((user_res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", user_res.data.data._id);
            localStorage.setItem("role", user_res.data.data.role);
            navigate("/");
          });
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoggingIn(false);
      });
  }

  function handleChange(event) {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="page-wrapper">
        <h2 className="form-title">Login</h2>
        <form className="login-form-wrapper" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              disabled={loggingIn}
              placeholder="Email *"
              onChange={handleChange}
              value={payload.email}
            />
            {error === "Invalid email" && (
              <div className="form-error">
                <RiErrorWarningFill />
                <span>Invalid Email</span>
              </div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              disabled={loggingIn}
              placeholder="Password *"
              onChange={handleChange}
              value={payload.password}
            />
            {error === "Invalid Password" && (
              <div className="form-error">
                <RiErrorWarningFill />
                <span>Invalid Password</span>
              </div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="role">Role</label>
            <select
              value={payload.role}
              name="role"
              onChange={handleChange}
              required
            >
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
            {error === "Invalid role" && (
              <div className="form-error">
                <RiErrorWarningFill />
                <span>Invalid Role</span>
              </div>
            )}
          </div>
          <button className="form-btn" disabled={loggingIn}>
            {loggingIn ? "Logging in..." : "Login"}
          </button>
          <div className="form-link">
            <span>Not a member?</span> <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
      {loggingIn &&
        createPortal(
          <LoaderContainer />,
          document.getElementById("modal-container")
        )}
    </>
  );
}

export default LoginPage;
