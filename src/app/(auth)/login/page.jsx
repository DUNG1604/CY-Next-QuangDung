'use client';

import {useState} from 'react';
import Link from "next/link";
import {showError, showSuccess} from "@/utils/notifyToast";
import {useRouter} from "next/navigation";
import authStore from "@/store/authStore";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const userStore = authStore();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            userStore.setUser(res.user);
            showSuccess("Login success");
            router.push("/");
        } catch (err) {
            console.error('Error logging in:', err);
            showError("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-6 py-8 rounded-md w-full max-w-md">
                <div className="text-center font-semibold text-2xl text-gray-800 uppercase">
                    Login
                </div>
                <div className="relative mt-6">
                    <div className="absolute inset-x-0 top-0 flex justify-center">
            <span className="bg-white px-4 text-gray-500 text-sm uppercase">
              Login With Email
            </span>
                    </div>
                    <hr className="border-gray-300"/>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleLogin}>
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
                        <div className="flex justify-between items-center mb-4">
                            <a
                                href="#"
                                className="text-sm text-blue-500 hover:text-blue-700"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <Link
                        href="/signup"
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                        Don&apos;t have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
