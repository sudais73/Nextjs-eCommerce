'use client'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const AuthPage = () => {
    const [state, setState] = useState("login");
    const { registerUser, loginUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    // Handle form submission (Login or Sign Up)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state === 'login') {
            // Login
            const success = await loginUser({ email: formData.email, password: formData.password });
            if (success) {
                setFormData({ username: '', email: '', password: '' }); // Clear form
            }
        } else {
            // Sign Up
            const success = await registerUser(formData);
            if (success) {
                setFormData({ username: '', email: '', password: '' }); // Clear form
            }
        }

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input value={formData.name}
                        name="name"
                        onChange={handleChange} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input value={formData.email}
                    name="email"
                    onChange={handleChange} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input value={formData.password}
                    name="password"
                    onChange={handleChange} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    );
};

export default AuthPage