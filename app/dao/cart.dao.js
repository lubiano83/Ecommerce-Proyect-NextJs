import CartModel from "../models/cart.model.js";
import { isValidId } from "../config/mongoose.config.js";

export default class CartDao {
    
    getCarts = async( params ) => {
        return await CartModel.find( params );
    }

    getCartById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await CartModel.findOne( id );
    }

    createCart = async(doc) => {
        return await CartModel.create(doc);
    }

    updateCartById = async( id, doc ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await CartModel.findByIdAndUpdate( id, { $set: doc } );
    }

    deleteCartById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await CartModel.findByIdAndDelete( id );
    }
}