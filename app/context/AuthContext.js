"use client";
import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initialValues = {
        logged: false,
        email: null,
        uid: null,
    };

    const [user, setUser] = useState(initialValues);
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registro exitoso");
                setFormValues({ first_name: "", last_name: "", email: "", password: "" });
            } else {
                alert(data.message || "Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error en el registro");
        }
    };

    return (
        <AuthContext.Provider value={{ user, registerUser, formValues, handleChange }}>
            {children}
        </AuthContext.Provider>
    );
};