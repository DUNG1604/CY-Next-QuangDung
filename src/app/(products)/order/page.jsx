'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import productStore from "@/store/productStore";
import { productService } from "@/services/productService";
import { showError, showSuccess } from "@/utils/notifyToast";
import {formatPrice} from "@/utils/formatPrice";

const OrderPage = () => {
    const listOrder = productStore(state => state.listOrder);
    const setBillOrder = productStore(state => state.setBillOrder);
    const clearOderList = productStore(state => state.clearListOrder);
    const refreshCart = productStore(state => state.refreshCart);
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const totalPrice = listOrder.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const resetInput = () => {
        setPhone("");
        setAddress("");
    };

    const placeOrder = async () => {
        if (!listOrder.length) {
            showError("List Order Empty!!!");
            router.push("/product");
            return;
        }

        const data = {
            address,
            phone,
            cart_item: listOrder,
        };

        try {
            const res = await productService.postOrder(data);
            clearOderList();
            refreshCart();
            resetInput();
            setBillOrder(data);
            showSuccess("Order success");
            router.push("/order/success");
        } catch (error) {
            resetInput();
            showError("Order failed");
            console.error(error);
        }
    };

    if (!listOrder.length) {
        return (
            <div className="text-center text-[30px] mt-[30px] font-bold">
                <div>Order Empty :((</div>
                <button
                    className="lg:w-auto my-2 border rounded md py-1 px-4 text-center
                    bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700
                    focus:ring-opacity-50 text-[20px]"
                    onClick={() => router.push("/product")}
                >
                    Shopping Now
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-8 p-8">
            <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Your Order</h2>
                <ul className="overflow-y-auto max-h-[200px]">
                    {listOrder.map((item, index) => (
                        <li
                            key={index}
                            className="mb-4 flex justify-between"
                        >
              <span>
                {item.name} (x{item.quantity})
              </span>
                            <span className="font-bold ml-[20px]">
                {formatPrice(item.price * item.quantity)}
              </span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
            </div>
            <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        placeOrder();
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-lg mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-lg mb-2"
                        >
                            Address
                        </label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderPage;
