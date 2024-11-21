/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import React from "react";

function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isFormValid) {
    try {
      const response = await fetch(
        "https://agritech-backend-922n.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsLoggedIn(true);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.errors);
        alert(errorData.errors.join(", "));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  }
};
  const nameValidation = {
    isValid: name.length >= 2 && /^[a-zA-Z\s]*$/.test(name),
    message: "Name must be at least 2 characters and contain only letters",
  };

  const emailValidation = {
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: "Please enter a valid email address",
  };

  const passwordValidations = [
    { test: password.length >= 8, message: "At least 8 characters" },
    { test: /[A-Z]/.test(password), message: "One uppercase letter" },
    { test: /[a-z]/.test(password), message: "One lowercase letter" },
    { test: /[0-9]/.test(password), message: "One number" },
    { test: /[^A-Za-z0-9]/.test(password), message: "One special character" },
  ];

  const strength = passwordValidations.filter((v) => v.test).length;
  const isFormValid =
    nameValidation.isValid && emailValidation.isValid && strength === 5;

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "bg-gray-200/50";
      case 1:
        return "bg-red-500/50";
      case 2:
        return "bg-orange-500/50";
      case 3:
        return "bg-yellow-500/50";
      case 4:
        return "bg-green-500/50";
      case 5:
        return "bg-emerald-500/50";
      default:
        return "bg-gray-200/50";
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="pt-10">
      <div className="min-h-screen flex items-center justify-center p-4 relative bg-red">
        <div className="absolute inset-0 flex items-center justify-center bg-[url('https://frederica.pt/cdn/shop/articles/plantas-scaled.jpg?v=1696650424&width=1440')] rounded-b-lg bg-center bg-no-repeat bg-[length:90%_90%] " />
        <div className="absolute inset-0 bg-black/70" />

        <div className="w-full max-w-2xl mx-auto space-y-20 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 relative">
          <div className="text-center space-y-2">
            <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">
              Get Started
            </h2>
            <p className="text-sm text-white/80">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="hover:text-white/80 underline text-green-500 font-extrabold">
                Log in
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="relative group">
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 transition-colors group-hover:text-white/90 z-10" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`pl-10 w-full px-4 py-3 border ${
                      touched.name && !nameValidation.isValid
                        ? "border-red-400/50"
                        : "border-white/20"
                    } rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20`}
                    placeholder="Full Name"
                  />
                </div>
                {touched.name && !nameValidation.isValid && (
                  <p className="text-red-500 text-sm pl-2">
                    {nameValidation.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 transition-colors group-hover:text-white/90 z-10" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`pl-10 w-full px-4 py-3 border ${
                      touched.email && !emailValidation.isValid
                        ? "border-red-400/50"
                        : "border-white/20"
                    } rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20`}
                    placeholder="Email address"
                  />
                </div>
                {touched.email && !emailValidation.isValid && (
                  <p className="text-red-500 text-sm pl-2">
                    {emailValidation.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 transition-colors group-hover:text-white/90 z-10" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    className="pl-10 w-full px-4 py-3 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors z-10">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-full rounded-full transition-colors ${
                            i < strength
                              ? getStrengthColor(strength)
                              : "bg-gray-200/50"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {passwordValidations.map(({ test, message }, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm">
                          {test ? (
                            <CheckCircle2 className="h-4 w-4 text-green-400/80" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400/80" />
                          )}
                          <p
                            className={`${
                              test ? "text-green-400/80" : "text-red-400/80"
                            }`}>
                            {message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`group relative w-full flex justify-center py-3 px-4 border border-white/20 text-sm font-medium rounded-xl text-white ${
                  isFormValid
                    ? "bg-white/20 hover:bg-white/30"
                    : "bg-white/10 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 backdrop-blur-sm`}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="text-white/80 text-sm">or</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            <div className="mt-6">
              <a href="https://accounts.google.com">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/20 rounded-xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 backdrop-blur-sm">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  Continue with Google
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
