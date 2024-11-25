'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import productStore from "@/store/productStore";
import authStore from "@/store/authStore";
import {formatPrice} from "@/utils/formatPrice";

export default function OrderSuccess() {
    const router = useRouter();
    const billOrder = productStore(state => state.billOrder);
    const {user} = authStore();

    if (!billOrder || !billOrder.cart_item) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>No order details found. Redirecting...</p>
            </div>
        );
    }

    const totalPrice = billOrder.cart_item.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const goToHomePage = () => {
        router.push("/product");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <div className="text-center mb-8 flex flex-col items-center">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/icons/check.png"
                            alt="Success"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        Order Placed Successfully!
                    </h2>
                    <p className="text-gray-600">
                        Thank you for shopping with us. Your order has been confirmed.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
                    <div className="mt-2 text-gray-700">
                        <p>
                            <strong>Order ID:</strong> #123456789
                        </p>
                        <p>
                            <strong>Order Date:</strong>{" "}
                            {new Date().toLocaleTimeString()} -{" "}
                            {new Date().toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Total Amount:</strong> {formatPrice(totalPrice)}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Shipping Information
                    </h3>
                    <div className="mt-2 text-gray-700">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Address:</strong> {billOrder.address}
                        </p>
                        <p>
                            <strong>Phone:</strong> {billOrder.phone}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Products Ordered
                    </h3>
                    <ul className="mt-2 space-y-3">
                        {billOrder.cart_item.map((item, index) => (
                            <li
                                key={item.product_id}
                                className="grid grid-cols-8 p-2 bg-gray-50 rounded gap-2"
                            >
                                <span className="col-span-1">{index + 1}</span>
                                <span className="line-clamp-1 col-span-4">{item.name}</span>
                                <span className="col-span-1">SL: {item.quantity}</span>
                                <span className="col-span-2">
                                    {formatPrice(item.quantity * item.price)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center">
                    <button
                        onClick={goToHomePage}
                        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
