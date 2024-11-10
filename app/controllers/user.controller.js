import UserDao from '../dao/user.dao.js';
import CartDao from '../dao/cart.dao.js';
import SessionDao from "../dao/session.dao.js";
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import jwt from "jsonwebtoken";

const userDao = new UserDao();
const cartDao = new CartDao();
const sessionDao = new SessionDao();

export default class UserController {
    getUsers = async() => {
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
            if (!first_name || !last_name || !email || !password) return { status: 400, message: "Todos los campos son requeridos" };
            const hashedPassword = await createHash(password);
            const newCart = await cartDao.createCart({ products: [] });
            const newUserData = { first_name, last_name, email, password: hashedPassword, cart: newCart._id };
            const user = await userDao.createUser(newUserData);
            return { status: 201, user };
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al registrar un usuario", error: error.message };
        }
    }

    loginUser = async(userData) => {
        try {
            const { email, password } = userData;
            const user = await userDao.findUserByEmail(email);
            if (!user) return { status: 404, message: "El usuario no está registrado" };
            const passwordMatch = await isValidPassword(user, password);
            if (!passwordMatch) return { status: 401, message: "La contraseña es incorrecta" };
            const token = jwt.sign({ email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role, cart: user.cart, id: user._id.toString() }, "coderhouse", { expiresIn: "1h" });
            await sessionDao.createSession(user._id, token);
            return { status: 200, token }
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al logear un usuario", error: error.message };
        }
    };

    usersLogged = async() => {
        try {
            const users = await sessionDao.getSessions();
            const usersOnline = users.length;
            return usersOnline;
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al obtener los usuarios online", error: error.message };
        }
    };

    usersRegistered = async() => {
        try {
            const users = await userDao.getUsers();
            const usersRegistered = users.length;
            return usersRegistered;
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al obtener los usuarios registrados", error: error.message };
        }
    };

    deleteUserById = async(id) => {
        try {
            await userDao.deleteUserById(id)
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al eliminar un usuario", error: error.message };
        }
    };

    updateUser = async (id, data) => {
        try {
            const { first_name, last_name, address, images, password } = data;
            const updateData = {};
            if (first_name) updateData.first_name = first_name;
            if (last_name) updateData.last_name = last_name;
            if (address) updateData.address = address;
            if (images) updateData.images = images;
            if (password) updateData.password = password;
            const updatedUser = await userDao.updateUserById(id, updateData);
            if (!updatedUser) return { status: 404, message: "Usuario no encontrado" };
            return { status: 200, message: "Usuario modificado exitosamente", updatedUser };
        } catch (error) {
            console.log(error.message);
            return { status: 500, message: "Error al actualizar el usuario", error: error.message };
        }
    };    
}