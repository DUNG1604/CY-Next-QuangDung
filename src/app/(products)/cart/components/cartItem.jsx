import React from "react";
import productStore from "@/store/productStore";
import { showError, showSuccess } from "@/utils/notifyToast";
import {formatPrice} from "@/utils/formatPrice";

const CartItem = ({ id, img, name, price, quantity, stock }) => {
    const deleteCartItem = productStore(state => state.deleteItemCart);
    const updateCartItem = productStore(state => state.updateCartItem);
    const orderList = productStore(state => state.listOrder);
    const deleteOrderItem = productStore(state => state.deleteOrderItem);
    const updateQuantityOrderItem = productStore(state => state.updateQuantityOrderItem);
    const handleDeleteCartItem = (id) => {
        deleteCartItem(id);
        const itemInOrderList =orderList.find(item => item.product_id === id);
        if(itemInOrderList){
            deleteOrderItem(id);
        }
        showSuccess("Deleted");
    };

    const handleChangeQuantity = (id, quantityChange) => {
        const newQuantity = quantity + quantityChange;
        const itemInOrderList =orderList.find(item => item.product_id === id);
        if (newQuantity <= 0) {
            deleteCartItem(id);
            if(itemInOrderList){
                deleteOrderItem(id);
            }
            showSuccess("Deleted");
        } else if (newQuantity > stock) {
            showError("Out of stock");
        } else {
            updateCartItem(id, newQuantity);
            updateQuantityOrderItem(id, newQuantity);
        }
    };

    return (
        <div className="w-full flex flex-col h-fit gap-4 mt-[10px]">
            <div className="grid grid-cols-8 p-4 text-lg font-semibold shadow-md border rounded-sm items-center gap-4">
                <div className="col-span-2 flex justify-center">
                    <div className="w-28 h-28">
                        <img className="w-full h-full object-cover" src={img} alt={name} />
                    </div>
                </div>

                <div className="col-span-3">
                    <p className="text-lg text-gray-800 font-semibold line-clamp-1">{name}</p>
                </div>

                <div className="col-span-1 text-center">
                    <p className="text-gray-800 font-normal text-xl">{formatPrice(price)}/item</p>
                </div>

                <div className="col-span-1 flex items-center gap-2 justify-center">
                    <button
                        onClick={() => handleChangeQuantity(id, -1)}
                        className="w-5 h-5 rounded-full border border-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                        </svg>
                    </button>

                    <div className="flex items-center w-8 h-8 justify-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm">
                        {quantity}
                    </div>

                    <button
                        onClick={() => handleChangeQuantity(id, 1)}
                        className="w-5 h-5 rounded-full border border-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </button>
                </div>

                <div className="col-span-1 flex justify-center">
                    <button onClick={() => handleDeleteCartItem(id)} className="mx-auto">
                        <svg
                            height="24px"
                            width="24px"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                        >
                            <g>
                                <path
                                    d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4l0-0.4L147.7,128h217.2L341.6,417.9z"
                                />
                                <g>
                                    <rect height="241" width="14" x="249" y="160" />
                                    <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                                    <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
