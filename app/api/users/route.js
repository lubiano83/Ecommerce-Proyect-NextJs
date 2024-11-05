import { NextResponse } from 'next/server';
import UserController from '../../controllers/user.controller';

const userController = new UserController();

export async function GET() {
    try {
        const response = await userController.getUsers();
        return NextResponse.json(response.data || { message: response.message }, { status: response.status });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los usuarios en la api", error: error.message }, { status: 500 });
    }
}
