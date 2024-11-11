"use client";
import { createContext, useState } from "react";
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

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

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inicio de sesión exitoso");
                setFormValues({ email: "", password: "" });
                router.push("/");
            } else {
                alert(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert("Error en el inicio de sesión");
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/sessions", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                router.push("/");  // Redirige al usuario al inicio de sesión
            } else {
                const errorData = await response.json();
                console.error(errorData.message || "Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error en logout:", error);
        }
    };    

    return (
        <AuthContext.Provider value={{ registerUser, formValues, handleChange, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};