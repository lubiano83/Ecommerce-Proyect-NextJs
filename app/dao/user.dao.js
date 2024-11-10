import UserModel from "../models/user.model.js";
import CartDao from "./cart.dao.js";
import { isValidId, connectDB } from "../config/mongoose.config.js";

const cartDao = new CartDao();

export default class UserDao {

    constructor() {
        // Intentamos conectar a la base de datos
        connectDB();
    }
    
    getUsers = async() => {
        try {
            return await UserModel.find();
        } catch (error) {
            console.log(error.message);
            throw new Error({ message: "Error al obtener los usuarios en el dao", error: error.message });
        }
    };

    getUserById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        try {
            return await UserModel.findOne( id );
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al obtener el usuario por el id: " + error.message );
        }
    }

    findUserByEmail = async( email ) => {
        try {
            return await UserModel.findOne({ email: email });
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al obtener el usuario por el email: " + error.message );
        }
    };

    createUser = async( doc ) => {
        try {
            return await UserModel.create( doc );
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al crear un usuario: " + error.message );
        }
    }

    updateUserById = async( id, doc ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        try {
            return await UserModel.findByIdAndUpdate( id, { $set: doc }, { new: true } );
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al actualizar un usuario por el id: " + error.message );
        }
    }

    deleteUserById = async(id) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        try {
            const user = await UserModel.findById(id);
            if (!user) return { status: 404, message: "Usuario no encontrado" };
            await cartDao.deleteCartById(user.cart);
            await UserModel.findByIdAndDelete(id);
            return { status: 200, message: "Usuario y carrito eliminados exitosamente" };
        } catch (error) {
            console.log(error.message);
            throw new Error("Error al eliminar un usuario y su carrito: " + error.message);
        }
    };
}