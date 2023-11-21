"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
    });
  }, [error]);
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const router = useRouter();
  const handleError = (msg) => {
    let errors = [];
    for (let key in msg) {
      errors.push(msg[key]);
    }
    let textError = [];
    errors.forEach((errors) => {
      errors.forEach((e) => {
        textError.push(e);
      });
    });
    return textError.join();
  };
  //   REGISTER
  const register = async (user) => {
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        c_password: user.confirmPassword,
      }),
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setLoading(false);
      setError(null);
      toast.success("شما با موفقیت ثبت نام شدید");
      router.push("/auth/login");
    } else {
      setLoading(false);
      setUser(null);
      setError(handleError(data.message));
    }
  };

  //   LOGIN
  const login = async (user) => {
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setLoading(false);
      setError(null);
      setUser(data.user);
      toast.success("شما با موفقیت وارد شدید");
      router.push("/");
    } else {
      setLoading(false);
      setUser(null);
      setError(handleError(data.message));
    }
  };
  //LOGOUT
  const logout = async () => {
    setError(null);
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setUser(null);
      toast.success("logged out successfully");
      router.push("/");
    } else {
      setError(data.message.message);
    }
  };
  //checkUserLoggedIn
  const checkUserLoggedIn = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ register, login, logout, error, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
