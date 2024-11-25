'use client'
import CartItem from "@/app/(products)/cart/components/cartItem";
import productStore from "@/store/productStore";
import {useRouter} from "next/navigation";
import {showError} from "@/utils/notifyToast";
import {formatPrice} from "@/utils/formatPrice";

export default function Cart() {
    const listCart = productStore(state => state.listCart);
    const listOrder = productStore(state => state.listOrder);
    const updateIsChoose = productStore(state => state.updateIsChoose);
    const addOrderItem = productStore(state => state.addOrderItem);
    const deleteOrderItem = productStore(state => state.deleteOrderItem);
    const router = useRouter();
    const handleChangeIsChoose = (item) => {
        updateIsChoose(item.product_id);
        if (!item.isChoose) {
            addOrderItem(item);
        } else {
            deleteOrderItem(item.product_id);
        }
    }
    const handleOrder = () => {
        if (!listOrder.length) {
            showError("Please add product!!!");
            return;
        }
        router.push("/order");
    }
    if (!listCart.length) {
        return (
            <div className="text-center text-[30px] mt-[30px] font-bold">
                <div>Cart Empty :((</div>
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
        <div className="px-[50px]">
            <div className="overflow-y-scroll max-h-[520px]">
                {listCart.map((item, index) => (
                    <div className="relative" key={index}>
                        <input
                            className="w-[20px] h-[20px] absolute left-[27px] top-[60px]"
                            type="checkbox"
                            checked={item.isChoose}
                            onChange={() => handleChangeIsChoose(item)}
                        />
                        <CartItem
                            id={item.product_id}
                            img={item.img}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            stock={item.stock}
                        />
                    </div>
                ))}
            </div>
            <div className="px-[100px] mt-4 p-4 border-t">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-800">Total: {formatPrice(listOrder.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
                    <button
                        onClick={() => handleOrder()}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
}
