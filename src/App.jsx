import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import Login from "./components/Login";

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !Loading ? (
    <div className="h-screen flex flex-wrap content-between bg-slate-500">
      <div className="w-full block">
        <h1>Hello World!!!!</h1>
      </div>
    </div>
  ) : null;
}

export default App;
