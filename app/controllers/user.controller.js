import UserService from "../services/user.service";
import { createHash } from "../utils/bcrypt.js";
import { response } from "../utils/response";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    getUsers = async(req, res) => {
        try {
            const users = await this.userService.getUsers();
            return res.json(users)
        } catch (error) {
            response(res, 500, "Error al obtener los usuarios..")
        }
    };

    registerUser = async(req, res) => {
        const { first_name, last_name, email, password } = req.body;
        try {
            if(!first_name || !last_name || !email || !password) {
                response(res, 400, "Todos los campos son requeridos..");
            }

            const updatedData = {
                first_name,
                last_name,
                email,
                password: createHash(password),
            };

            await this.userService.registerUser(updatedData);
            res.redirect("/");
        } catch (error) {
            response(res, 500, "Error al registrar un usuario..");
        }
    };
};