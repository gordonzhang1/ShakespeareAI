import { Link, useNavigate } from "react-router-dom";
import "../Login.css";
import React, { useState } from "react";
import "../Signup.css";
import { useAuth } from "../../server/authcontext";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      //basically what this does is that it makes it so that the function doesnt continue until the signup function completes because it has an await before it, and we do this because it takes time to make api calls
      //wait for signup to finish.
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#103cbe" }}
          >
            <div className="featured-image mb-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="Featured"
                className="img-fluid"
                style={{ width: "250px" }}
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 600,
              }}
            >
              Sign up
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              The new AI Note-Taking Platform.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Password Reset</h2>
                <p>It's okay, everyone forgets their passwords</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    ref={emailRef}
                  />
                </div>
                <div className="input-group mb-5 d-flex justify-content-between"></div>
                <div className="input-group mb-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <div className="row">
                <small>
                  <Link to="/login"> Back to Login</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
