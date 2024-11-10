import { NextResponse } from 'next/server';
import UserController from '../../../controllers/user.controller.js';

const userController = new UserController();

export async function GET() {
    try {
        const result = await userController.getUsers();
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los usuarios", error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        if(!id) return NextResponse.json({ message: "ID de usuario es requerido" }, { status: 400 });
        const result = await userController.deleteUserById(id);
        if(result === "ID no válido") return NextResponse.json({ message: "ID no válido" }, { status: 400 });
        return NextResponse.json({ message: "Usuario eliminado exitosamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar el usuario", error: error.message }, { status: 500 });
    }
}