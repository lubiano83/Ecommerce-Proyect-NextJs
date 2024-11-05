import UserService from '../services/user.service';

const userService = new UserService();

export default class UserController {
    async getUsers() {
        try {
            const users = await userService.getUsers();
            return { status: 200, data: users };
        } catch (error) {
            return { status: 500, message: "Error al obtener los usuarios en el controller", error: error.message };
        }
    }
}
