import { NextResponse } from 'next/server';
import UserController from '../../../controllers/user.controller.js';
import { serialize } from 'cookie';

const userController = new UserController();

export async function POST(request) {
    try {
        const userData = await request.json();
        const result = await userController.loginUser(userData);

        if (result.status === 200) {
            const token = result.token;

            const response = NextResponse.json(
                {
                    message: "Inicio de sesión exitoso",
                    token: token, // Incluye el token en el cuerpo de la respuesta JSON
                },
                { status: 200 }
            );
            response.headers.set(
                'Set-Cookie',
                serialize('coderCookieToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600,
                    path: '/',
                })
            );

            return response;
        } else {
            // Devuelve un error específico según el estado en el controlador
            return NextResponse.json({ message: result.message }, { status: result.status });
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Error al procesar la solicitud de inicio de sesión", error: error.message },
            { status: 500 }
        );
    }
}