import SessionModel from "../models/session.model.js";
import { isValidId } from "../config/mongoose.config.js";

export default class UserDao {
    
    createSession = async (id, token) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        try {
            return await SessionModel.create({ id, token });
        } catch (error) {
            throw new Error( "Error al crear una session " + error.message );
        }
    };
    
    getSessions = async () => {
        try {
            return await SessionModel.find();
        } catch (error) {
            throw new Error( "Error al obtener las sessions " + error.message );
        }
    };
}