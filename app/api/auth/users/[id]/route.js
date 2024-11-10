import { NextResponse } from 'next/server';
import UserController from '../../../../controllers/user.controller.js';
import { isValidId } from '@/app/config/mongoose.config.js';

const userController = new UserController();

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const { data } = await request.json();
        if (!id || !data) return NextResponse.json({ message: "ID de usuario y datos son requeridos" }, { status: 400 });
        if (!isValidId(id)) return NextResponse.json({ message: "ID no válido" }, { status: 400 });
        const result = await userController.updateUser(id, data);
        if (result.status === 400 || result.status === 404) return NextResponse.json({ message: result.message }, { status: result.status });
        return NextResponse.json({ message: result.message, updatedUser: result.updatedUser }, { status: result.status });
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar el usuario", error: error.message }, { status: 500 });
    }
}