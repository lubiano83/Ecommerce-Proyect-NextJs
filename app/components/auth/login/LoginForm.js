"use client";
import React, { useState } from 'react';
import Button from '../../Button';

const LoginForm = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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
            } else {
                alert(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert("Error en el inicio de sesión");
        }
    };

    return (
        <div className="w-1/2 min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center bg-green-700 bg-opacity-25">
            <h2 className="text-2xl text-green-700 underline">Iniciar Sesión:</h2>
            <form onSubmit={loginUser} className="flex flex-col justify-center items-center gap-4">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Ingresa tu email.." 
                    required 
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-64 rounded-xl pl-2 h-8 text-gray-700"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Ingresa tu contraseña.." 
                    required 
                    value={formValues.password}
                    onChange={handleChange}
                    className="w-64 rounded-xl pl-2 h-8 text-gray-700"
                />
                <Button type="submit">Iniciar Sesión</Button>
            </form>
        </div>
    );
};

export default LoginForm;