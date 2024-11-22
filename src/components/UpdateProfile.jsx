import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../Signup.css";
import { useAuth } from "../../server/authcontext";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordconfirmRef.current.value) {
      return setError("Passwords dont match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
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
              ShakespeareAI
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
                <h2>Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Leave blank to keep the same"
                    ref={passwordRef}
                  />
                </div>
                <div className="confirm-password">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Confirm Password"
                    ref={passwordconfirmRef}
                  />
                </div>
                <div className="input-group mb-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
              <div className="row">
                <small>
                  <Link to="/dashboard"> Cancel</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
