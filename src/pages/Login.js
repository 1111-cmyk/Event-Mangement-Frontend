import React from "react";
import AuthForm from "../components/AuthForm";
import { login, register } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (formData) => {
    console.log("Sending data to backend: ", formData);
    try {
      const { data } = await register(formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold mb-4">Event Management</h1>
      <div className="flex gap-4 justify-center">
        <AuthForm onSubmit={handleLogin} isLogin />
        <AuthForm onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Login;
