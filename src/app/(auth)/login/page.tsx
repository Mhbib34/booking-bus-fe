"use client";
import { ArrowRight, Bus, Lock, Mail } from "lucide-react";
import Message from "../components/Message";
import Input from "@/components/fragment/Input";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import PageLoader from "@/components/fragment/PageLoader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LoginErrors {
  identifier?: string;
  password?: string;
}

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleLoginChange = (field: keyof typeof loginForm, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateLogin = () => {
    const newErrors: LoginErrors = {};

    if (!loginForm.identifier.trim()) {
      newErrors.identifier = "Email or phone number is required";
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
    } else if (loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLogin()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axiosInstance.post("/v1/auth/login", loginForm);
      showSuccess("Login successful. Redirecting...");
      console.log(res.data);

      if (res.data.data.role === "admin") {
        router.push("/admin");
      }
      if (res.data.data.role === "user") {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

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
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Message type={message.type} text={message.text} />

              <Input
                type="text"
                placeholder="Email or phone number"
                value={loginForm.identifier}
                onChange={(e) =>
                  handleLoginChange("identifier", e.target.value)
                }
                Icon={Mail}
                error={errors.identifier}
                disabled={loading}
              />

              <Input
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => handleLoginChange("password", e.target.value)}
                Icon={Lock}
                error={errors.password}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                disabled={loading}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    disabled={loading}
                  />
                  <span className="ml-2 text-sm text-gray-400">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                size={"lg"}
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-blue-500"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <span className="text-gray-400">Dont have an account? </span>
                <Link
                  href="/register"
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
