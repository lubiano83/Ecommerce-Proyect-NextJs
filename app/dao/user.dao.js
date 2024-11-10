import UserModel from "../models/user.model.js";
import { isValidId } from "../config/mongoose.config.js";

export default class UserDao {
    
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
            return await UserModel.findByIdAndUpdate( id, { $set: doc } );
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al actualizar un usuario por el id: " + error.message );
        }
    }

    deleteUserById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        try {
            return await UserModel.findByIdAndDelete( id );
        } catch (error) {
            console.log(error.message);
            throw new Error( "Error al eliminar un usuario por el id: " + error.message );
        }
    }
}