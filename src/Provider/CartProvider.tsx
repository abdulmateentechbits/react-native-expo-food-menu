import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
}
export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0
});


const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        // If already in the cart, just update the quantity

        const existingItem = items.find(item => item.product === product && item.size === size);
        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        };
        console.log("🚀 ~ addItem ~ newCartItem:", newCartItem)
        setItems([newCartItem, ...items]);
    }

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const newItems = items.map((item) => item.id !== itemId ? item : {
            ...item, quantity: item.quantity + amount
        }).filter((item) => item.quantity > 0);
        console.log("🚀 ~ newItems ~ newItems:", newItems)
        setItems(newItems);
    }
    const total = Number(items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2));

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            updateQuantity,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;

export const useCart = () => useContext(CartContext);