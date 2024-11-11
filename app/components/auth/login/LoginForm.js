"use client";
import React from 'react';
import Button from '../../Button';
import { useAuth } from '@/app/hooks/useAuth';

const LoginForm = () => {

    const { loginUser, handleChange, formValues } = useAuth();

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