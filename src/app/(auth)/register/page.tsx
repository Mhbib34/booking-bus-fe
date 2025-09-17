"use client";

import Button from "@/components/fragment/Button";
import Input from "@/components/fragment/Input";
import { ArrowRight, Bus, Lock, Mail, Phone, User2 } from "lucide-react";
import Message from "../components/Message";
import React, { useState } from "react";
import { AuthValidation } from "@/utils/validate";
import { User } from "@/types/user";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/fragment/PageLoader";
import { showSuccess } from "@/lib/sonner";

const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    phone: "",
    full_name: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<User>({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleRegisterChange = (
    field: keyof typeof registerForm,
    value: string
  ) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateRegister = () => {
    const newErrors: User = {};

    if (!registerForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!AuthValidation.validateEmail(registerForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!registerForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!AuthValidation.validatePhone(registerForm.phone)) {
      newErrors.phone =
        "Please enter a valid Indonesian phone number (08xxxxxxxxxx)";
    }

    if (!registerForm.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    } else if (registerForm.full_name.trim().length < 2) {
      newErrors.full_name = "Full name must be at least 2 characters";
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required";
    } else if (registerForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegister()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call
      await axiosInstance.post("/v1/auth/register", {
        email: registerForm.email,
        phone: registerForm.phone,
        full_name: registerForm.full_name,
        password: registerForm.password,
      });
      showSuccess("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "Registration failed. Please try again.",
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
                Create Account
              </h1>
              <p className="text-gray-400">
                Join us to explore the world of BusKu.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <Message type={message.type} text={message.text} />

              <Input
                type="text"
                placeholder="Full Name"
                value={registerForm.full_name}
                onChange={(e) =>
                  handleRegisterChange("full_name", e.target.value)
                }
                Icon={User2}
                error={errors.full_name}
                disabled={loading}
              />

              <Input
                type="email"
                placeholder="Email Address"
                value={registerForm.email}
                onChange={(e) => handleRegisterChange("email", e.target.value)}
                Icon={Mail}
                error={errors.email}
                disabled={loading}
              />

              <Input
                type="tel"
                placeholder="Phone Number (08xxxxxxxxxx)"
                value={registerForm.phone}
                onChange={(e) => handleRegisterChange("phone", e.target.value)}
                Icon={Phone}
                error={errors.phone}
                disabled={loading}
              />

              <Input
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) =>
                  handleRegisterChange("password", e.target.value)
                }
                Icon={Lock}
                error={errors.password}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                disabled={loading}
              />

              <Input
                placeholder="Confirm Password"
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  handleRegisterChange("confirmPassword", e.target.value)
                }
                Icon={Lock}
                error={errors.confirmPassword}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                disabled={loading}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={loading}
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

              <Button onClick={() => handleRegister} loading={loading}>
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <span className="text-gray-400">Already have an account? </span>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                  disabled={loading}
                  onClick={() => router.push("/login")}
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
