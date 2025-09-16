"use client";
import { ArrowRight, Bus, Lock, Mail } from "lucide-react";
import Message from "../components/Message";
import Input from "@/components/fragment/Input";
import Button from "@/components/fragment/Button";

import React, { useState } from "react";

const LoginPage = () => {
  const [message, setMessage] = useState({ type: "", text: "" });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-[450px]">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-xl">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Bus className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to access your admin dashboard
              </p>
            </div>

            <form
              // onSubmit={handleLogin}
              className="space-y-6"
            >
              <Message type={message.type} text={message.text} />

              <Input
                type="text"
                placeholder="Email or phone number"
                // value={loginForm.identifier}
                // onChange={(e) => handleLoginChange("identifier", e.target.value)}
                Icon={Mail}
                // error={errors.identifier}
                // disabled={loading}
              />

              <Input
                placeholder="Password"
                // value={loginForm.password}
                // onChange={(e) => handleLoginChange("password", e.target.value)}
                Icon={Lock}
                // error={errors.password}
                showPasswordToggle={true}
                // showPassword={showPassword}
                // onTogglePassword={() => setShowPassword(!showPassword)}
                // disabled={loading}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    // disabled={loading}
                  />
                  <span className="ml-2 text-sm text-gray-400">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  //   disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <Button
              //   onClick={handleLogin}
              // loading={loading}
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <span className="text-gray-400">Dont have an account? </span>
                <button
                  type="button"
                  //   onClick={() => setCurrentPage("register")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  //   disabled={loading}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
