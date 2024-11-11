import { NextResponse } from 'next/server';
import UserController from '../../../controllers/user.controller.js';

const userController = new UserController();

export async function GET() {
    try {
        const users = await userController.usersLogged();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los usuarios", error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { token } = await request.json();
        if (!token) return NextResponse.json({ message: "Token no proporcionado" }, { status: 400 });
        const result = await userController.logoutUser(token);
        if (result.status !== 200) return NextResponse.json(result, { status: result.status });
        const response = NextResponse.json({ message: "Sesión cerrada exitosamente" });
        response.cookies.set("token", "", { maxAge: 0, path: "/" });
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar la sesión", error: error.message }, { status: 500 });
    }
}