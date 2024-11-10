import UserDao from '../dao/user.dao.js';
import CartDao from '../dao/cart.dao.js';
import SessionDao from "../dao/session.dao.js";
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import jwt from "jsonwebtoken";

const userDao = new UserDao();
const cartDao = new CartDao();
const sessionDao = new SessionDao();

export default class UserController {
    getUsers = async () => {
        try {
            const users = await userDao.getUsers();
            return { status: 200, users };
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al obtener los usuarios", error: error.message };
        }
    }

    registerUser = async(userData) => {
        try {
            const { first_name, last_name, email, password } = userData;

            if (!first_name || !last_name || !email || !password) {
                return { status: 400, message: "Todos los campos son requeridos" };
            }

            // Usamos await en createHash para asegurar que tenemos una cadena encriptada.
            const hashedPassword = await createHash(password);
            const newCart = await cartDao.createCart({ products: [] });
            console.log(newCart);
            

            const newUserData = {
                first_name,
                last_name,
                email,
                password: hashedPassword,  // Aseguramos que password sea una cadena encriptada
                cart: newCart._id,
            };

            const user = await userDao.createUser(newUserData);
            return { status: 201, user };
        } catch (error) {
            console.log("Error al crear usuario:", error);
            console.log(error.message);
            return { status: 500, message: "Error al registrar un usuario", error: error.message };
        }
    }

    loginUser = async(userData) => {
        try {
            const { email, password } = userData;

            const user = await userDao.findUserByEmail(email);
            console.log(user);

            if (!user) {
                return { status: 404, message: "El usuario no está registrado" };
            }

            // Espera la verificación de la contraseña con await
            const passwordMatch = await isValidPassword(user, password);

            if (!passwordMatch) {
                return { status: 401, message: "La contraseña es incorrecta" };
            }

            const token = jwt.sign(
                { email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role, cart: user.cart, id: user._id.toString() },
                "coderhouse",
                { expiresIn: "1h" },
            );

            await sessionDao.createSession(user._id, token);
            return { status: 200, token }
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al logear un usuario", error: error.message };
        }
    };
}