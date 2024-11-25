"use client";

import React, { useEffect, useState } from "react";
import productStore from "@/store/productStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";
import authStore from "@/store/authStore";
import { useUtils } from "@/utils/useUtils";

const Header = () => {
    const addName = productStore((state) => state.setName);
    const listCart = productStore((state) => state.listCart);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [token, setToken] = useState(null);
    const { user, setUser } = authStore();
    const router = useRouter();
    const { getCookieOnClient, deleteCookie } = useUtils();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    useEffect(() => {
        const clientToken = getCookieOnClient("token");
        setToken(clientToken);
    }, [getCookieOnClient]);

    useEffect(() => {
        if (token) {
            console.log("Có token:", token);
            (async () => {
                const res = await userService.getUser();
                console.log("User info:", res);
                setUser(res);
            })();
        }
    }, [token, setUser]);
    const handleLogout = async () => {
        await userService.logout();
        await deleteCookie("token");
        setUser(null);
        router.push("/login");
    }

    return (
        <div className="py-2 px-12 border-b border-gray-200 shadow-md">
            <div className="flex justify-between items-center">
                <div
                    onClick={() => router.push("/")}
                    className="cursor-pointer text-center text-[#5046e5] text-[25px] font-extrabold"
                >
                    Shop&#39;s Andrew
                </div>

                {user ? (
                    <div className="flex gap-4 items-center">
                        <div className="text-lg font-medium">{user.name}</div>
                        <div className="relative cursor-pointer" onClick={toggleDropdown}>
                            <span className="material-symbols-outlined text-3xl">account_circle</span>
                            {isDropdownVisible && (
                                <div className="absolute z-40 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                                    <ul className="text-gray-700">
                                        <li onClick={()=>handleLogout()} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="cursor-pointer relative">
                            <Link href="/cart">
                                <div className="absolute p-[10px] rounded-full bg-red-500 text-white flex items-center text-[12px] font-bold justify-center w-[20px] h-[20px] left-[16px]">
                                    {listCart.length}
                                </div>
                                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
