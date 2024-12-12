import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onSubmit, isLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, () => {
            if (isLogin) {
                navigate("/dashboard");
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md p-8 mx-auto space-y-6 border border-gray-200 rounded-lg shadow-md bg-gray-50"
        >
            {!isLogin && (
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold text-gray-800">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="email" className="block font-semibold text-gray-800">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block font-semibold text-gray-800">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 text-white transition duration-150 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isLogin ? "Login" : "Register"}
            </button>
        </form>
    );
};

export default AuthForm;
