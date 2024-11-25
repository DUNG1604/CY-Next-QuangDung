'use client';

import {useState} from 'react';
import Link from "next/link";
import {userService} from "@/services/userService";
import {showError, showSuccess} from "@/utils/notifyToast";
import {useRouter} from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showError("Passwords don't match");
            return;
        }

        try {
            const res = await userService.signup({
                name: username,
                password: password,
                email: email,
            })
            showSuccess("Signup success");
            router.push("/login");
        } catch (err) {
            console.error('Error signing up:', err);
            showError("Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-6 py-8 rounded-md w-full max-w-md">
                <div className="text-center font-semibold text-2xl text-gray-800 uppercase">
                    Sign Up
                </div>
                <div className="relative mt-6">
                    <div className="absolute inset-x-0 top-0 flex justify-center">
                        <span className="bg-white px-4 text-gray-500 text-sm uppercase">
                            Create Your Account
                        </span>
                    </div>
                    <hr className="border-gray-300"/>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSignup}>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-600 mb-2">
                                Username:
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-600 mb-2">
                                E-Mail Address:
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-600 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-600 mb-2">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
