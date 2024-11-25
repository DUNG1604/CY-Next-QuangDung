import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const productStore = create(
    persist(
        (set) => ({
            listCart: [],
            listProduct: [],
            listOrder: [],
            billOrder: null,
            name: null,
            setName: (name) => set((state)=>({
                name: name
            })),
            setBillOrder: (item) => set((state)=>({
                billOrder: item
            })),
            addCart: (item) => set((state) => ({
                listCart : [...state.listCart, item],
            })),
            deleteItemCart: (id) => set((state) => ({
                listCart: state.listCart.filter(item => item.product_id !== id),
            })),
            refreshCart: () => set((state) => ({
                listCart: state.listCart.filter(item => !item.isChoose),
            })),
            updateCartItem: (productId, newQuantity) => set((state) => ({
                listCart: state.listCart.map((item) =>
                    item.product_id === productId ? { ...item, quantity: newQuantity } : item
                ),
            })),
            updateIsChoose: (productId) => set((state) => ({
                listCart: state.listCart.map((item) =>
                    item.product_id === productId ? { ...item, isChoose: !item.isChoose } : item
                ),
            })),
            addProduct: (item) => set((state) => ({
                listProduct: [...state.listProduct, item],
            })),
            clearListProduct: () =>set((state) => ({
                listProduct: [],
            })),
            addOrderItem: (item) => set((state) => ({
                listOrder : [...state.listOrder, item],
            })),
            clearListOrder: () =>set((state) => ({
                listOrder: [],
            })),
            deleteOrderItem: (id) => set((state) => ({
                listOrder: state.listOrder.filter(item => item.product_id !== id),
            })),
            updateQuantityOrderItem: (productId, newQuantity) => set((state) => ({
                listOrder: state.listOrder.map((item) =>
                    item.product_id === productId ? { ...item, quantity: newQuantity } : item
                ),
            })),
        }),
        {
            name: 'list-cart',
            getStorage: () => localStorage,
        }
    )
);

export default productStore;
