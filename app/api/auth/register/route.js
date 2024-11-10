import { NextResponse } from 'next/server';
import UserController from '../../../controllers/user.controller.js';

const userController = new UserController();

export async function POST(request) {
    try {
        const userData = await request.json();
        const user = await userController.registerUser(userData);
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error al registrar un usuario", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await userController.usersRegistered();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los usuarios", error: error.message }, { status: 500 });
    }
}