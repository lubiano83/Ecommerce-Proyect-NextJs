import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';

const userController = new UserController();

export async function POST(req) {
    try {
       // Asegura la conexión a la base de datos
       await dbConnect();

       // Llamada al método de registro del controlador
       const result = await userController.registerUser(req.body);
       
       // Respuesta con el resultado del registro
       return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los datos de los usuarios', error }, { status: 500 });
    }
};

export async function GET() {
    try {
       // Llamada al método de registro del controlador
       const result = await userController.getUsers();
       
       // Respuesta con el resultado del registro
       return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los datos de los usuarios', error }, { status: 500 });
    }
};