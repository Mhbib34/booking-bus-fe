"use client";

import Button from "@/components/fragment/Button";
import Input from "@/components/fragment/Input";
import { ArrowRight, Bus, Lock, Mail, Phone, User } from "lucide-react";
import Message from "../components/Message";
import React, { useState } from "react";

const RegisterPage = () => {
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
                Create Account
              </h1>
              <p className="text-gray-400">
                Join us to manage your bus booking system
              </p>
            </div>

            <form
              //  onSubmit={handleRegister}
              className="space-y-6"
            >
              <Message type={message.type} text={message.text} />

              <Input
                type="text"
                placeholder="Full Name"
                // value={registerForm.full_name}
                // onChange={(e) => handleRegisterChange("full_name", e.target.value)}
                Icon={User}
                // error={errors.full_name}
                // disabled={loading}
              />

              <Input
                type="email"
                placeholder="Email Address"
                // value={registerForm.email}
                // onChange={(e) => handleRegisterChange("email", e.target.value)}
                Icon={Mail}
                // error={errors.email}
                // disabled={loading}
              />

              <Input
                type="tel"
                placeholder="Phone Number (08xxxxxxxxxx)"
                // value={registerForm.phone}
                // onChange={(e) => handleRegisterChange("phone", e.target.value)}
                Icon={Phone}
                // error={errors.phone}
                // disabled={loading}
              />

              <Input
                placeholder="Password"
                // value={registerForm.password}
                // onChange={(e) => handleRegisterChange("password", e.target.value)}
                Icon={Lock}
                // error={errors.password}
                showPasswordToggle={true}
                // showPassword={showPassword}
                // onTogglePassword={() => setShowPassword(!showPassword)}
                // disabled={loading}
              />

              <Input
                placeholder="Confirm Password"
                // value={registerForm.confirmPassword}
                // onChange={(e) =>
                //   handleRegisterChange("confirmPassword", e.target.value)
                // }
                Icon={Lock}
                // error={errors.confirmPassword}
                showPasswordToggle={true}
                // showPassword={showConfirmPassword}
                // onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                // disabled={loading}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  //   disabled={loading}
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <Button
              //    onClick={handleRegister}
              //     loading={loading}
              >
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <span className="text-gray-400">Already have an account? </span>
                <button
                  type="button"
                  //   onClick={() => setCurrentPage("login")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  //   disabled={loading}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
