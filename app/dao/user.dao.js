import UserModel from "../models/user.model.js";
import { connectDB, isValidId } from "../config/mongoose.config.js";

export default class UserDao {

    constructor() {
        // Establecer la conexión al crear una instancia
        connectDB();
    }
    
    getUsers = async() => {
        return await UserModel.find();
    }

    getUserById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await UserModel.findOne( id );
    }

    findUserByEmail = async( query ) => {
        return await UserModel.findOne( query );
    };

    createUser = async( doc ) => {
        return await UserModel.save( doc );
    }

    updateUserById = async( id, doc ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await UserModel.findByIdAndUpdate( id, { $set: doc } )
    }

    deleteUserById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await UserModel.findByIdAndDelete( id );
    }
}