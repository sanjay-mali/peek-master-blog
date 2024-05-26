import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appWrite/auth";
import { login as loginService } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { InputBtn, Button } from "./index";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createAccount = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const currentUser = await authService.getCurrentUser();

        if (currentUser) {
          dispatch(loginService(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img
              src="https://icons8.com/illustrations/author/zD2oqC8lLBBA"
              alt=""
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
            <InputBtn
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter your Full Name"
              {...register("name", { required: true })}
            />
            <InputBtn
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
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
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
