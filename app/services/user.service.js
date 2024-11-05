import { isValidPassword } from "../utils/bcrypt";
import UserDao from "../dao/user.dao";
import CartDao from "../dao/cart.dao";

export default  class UserService {
    constructor() {
        this.userDao = new UserDao();
        this.cartDao = new CartDao();
    }

    getUsers = async() => {
        try {
            const users = await this.userDao.getUsers();
            return users;
        } catch (error) {
            throw new Error({ message: "Error al obtener los usuarios en el service", error: error.message });
        }
    };

    registerUser = async( userData ) => {
        const { email } = userData;
        try {
            const user = await this.userDao.findUserByEmail( email );
            user && "El usuario ya existe..";

            const newCart = await this.cartDao.createCart({});
            const updatedData = {
                ...userData,
                cart: newCart._id,
            };

            return await this.userDao.createUser( updatedData );
        } catch ( error ) {
            throw new Error( "Error al registrar un usuario: " + error.message );
        }
    };

    loginUser = async( userData ) => {
        const { email, password } = userData;
        try {
            const user = await this.userDao.findUserByEmail( email );
            !user && "El usuario no existe.."

            const passwordMatch = isValidPassword(password, user);
            !passwordMatch && "La contraseña es incorrecta.."

            const token = jwt.sign(
                { email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role, cart: user.cart, id: user._id.toString() },
                "coderhouse",
                { expiresIn: "1h" },
            );

            return token;
        } catch (error) {
            throw new Error("Error al ingresar un usuario: " + error.message);
        }
    };
};