"use client";
import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cart]);

    const addToCart = (productToAdd) => {
        if (!isInCart(productToAdd.item.id)) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto agregado con éxito.",
                showConfirmButton: false,
                timer: 1500
            });
            setCart(prev => [...prev, productToAdd]);
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Este producto ya está en el Carrito!!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, prod) => total + prod.counter * prod.item.price, 0);
    };

    const getTotalQuantity = () => {
        return cart.reduce((total, prod) => total + prod.counter, 0);
    };

    const totalQuantity = getTotalQuantity();

    const removeItem = (id) => {
        setCart(prev => {
            const updatedCart = prev.filter(prod => prod.item.id !== id);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (id) => {
        return cart.some(prod => prod.item.id === id);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getTotalPrice, getTotalQuantity, removeItem, clearCart, isInCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};