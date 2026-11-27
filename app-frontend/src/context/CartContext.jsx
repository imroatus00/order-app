import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (menu) =>
        setItems((prev) => {
            const found = prev.find((i) => i.id === menu.id);
            if (found) {
                return prev.map((i) =>
                    i.id === menu.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...menu, qty: 1 }];
        });

    const decreaseItem = (id) =>
        setItems((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0)
        );

    const removeItem = (id) =>
        setItems((prev) => prev.filter((i) => i.id !== id));

    const clearCart = () => setItems([]);

    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, decreaseItem, removeItem, clearCart, totalQty, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);