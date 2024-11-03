import ProductModel from "../models/user.product.js";
import { connectDB, isValidId } from "../config/mongoose.config.js";

export default class ProductDao {

    constructor() {
        // Establecer la conexión al crear una instancia
        connectDB();
    }
    
    getProducts = async( params ) => {
        return await ProductModel.find( params );
    }

    getProductById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await ProductModel.findOne( id );
    }

    createProduct = async( doc ) => {
        return await ProductModel.save( doc );
    }

    updateProductById = async( id, doc ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await ProductModel.findByIdAndUpdate( id, { $set: doc } )
    }

    deleteProductById = async( id ) => {
        if (!isValidId(id)) {
            return "ID no válido";
        }
        return await ProductModel.findByIdAndDelete( id );
    }
}