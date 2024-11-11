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

export async function DELETE() {
    try {
        const result = await userController.logoutUser();
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar la sesión", error: error.message }, { status: 500 });
    }
}