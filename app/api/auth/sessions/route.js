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