"use client";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "@/contexts/AuthContext";

const RegisterPage = () => {
  const { loading, register } = useContext(AuthContext);

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

    if (
      !formDataObject.name.trim() ||
      !formDataObject.email.trim() ||
      !formDataObject.password.trim() ||
      !formDataObject.confirmPassword.trim()
    ) {
      toast.error("name or email or password or confirmPassword is empty ");
      return;
    }
    if (
      formDataObject.password.trim() !== formDataObject.confirmPassword.trim()
    ) {
      toast.error(" password not matched");
      return;
    }
    if (!validateEmail(formDataObject.email)) {
      toast.error("email is not valid");
      return;
    }
    if (formDataObject.name.trim().length < 4) {
      toast.error("the charecter name must be atleat 4 charecter");
      return;
    }

    formDataObject = {
      name: formDataObject.name.trim(),
      email: formDataObject.email.trim(),
      password: formDataObject.password.trim(),
      confirmPassword: formDataObject.confirmPassword.trim(),
    };

    register(formDataObject);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name:
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="name"
                name="name"
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                confirmPassword:
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="form-control"
                id="confirmPassword"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              register
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

export default RegisterPage;
