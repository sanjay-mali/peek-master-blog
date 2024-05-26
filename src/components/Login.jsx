import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appWrite/auth";
import { login as loginReducer } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { InputBtn, Button, LoadingSpinner } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onLoginClick = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.Login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(loginReducer(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        {loading && <LoadingSpinner />}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="logo"
              className="w-full"
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit(onLoginClick)} className="mt-8">
          <div className="space-y-5">
            <InputBtn
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <InputBtn
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoadingSpinner /> : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
