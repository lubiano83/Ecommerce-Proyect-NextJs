import SessionModel from "../models/session.model.js";
import { isValidId, connectDB } from "../config/mongoose.config.js";

export default class UserDao {

    constructor() {
        // Intentamos conectar a la base de datos
        connectDB();
    }

    getSessions = async () => {
        try {
            return await SessionModel.find();
        } catch (error) {
            throw new Error( "Error al obtener las sessions " + error.message );
        }
    };
    
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
}