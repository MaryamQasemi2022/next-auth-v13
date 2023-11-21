"use client";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "@/contexts/AuthContext";

const LoginPage = () => {
  const { loading, login } = useContext(AuthContext);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let formDataObject = Object.fromEntries(formData);

    if (!formDataObject.email.trim() || !formDataObject.password.trim()) {
      toast.error(" email or password  is empty ");
      return;
    }

    if (!validateEmail(formDataObject.email)) {
      toast.error("email is not valid");
      return;
    }

    formDataObject = {
      email: formDataObject.email.trim(),
      password: formDataObject.password.trim(),
    };

    login(formDataObject);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email:
              </label>
              <input
                type="email"
                required
                name="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password:
              </label>
              <input
                type="password"
                required
                name="password"
                className="form-control"
                id="password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              login
              {loading && (
                <div className="spinner-border spinner-border-sm"></div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
