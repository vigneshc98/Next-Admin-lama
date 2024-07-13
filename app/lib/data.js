import { Product, User } from "./models";
import { connectToDB } from "./utils"

export const fetchUsers = async (query, page) => {
    const regex = new RegExp(query, 'i');
    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await User.find({username: {$regex:regex}}).countDocuments();
        const users = await User.find({username: {$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1)).sort({createdAt:-1});
        return {count, users};
    } catch (error) {   
        console.log(error);
        throw new Error(error);
    }
}

export const fetchUser = async (id) => {
    try {
        connectToDB();
        return await User.findById(id);
    } catch (error) {   
        console.log(error);
        throw new Error(error);
    }
}

export const fetchProducts = async (query, page) => {
    const regex = new RegExp(query, 'i');
    const ITEM_PER_PAGE = 2;

    try {
        connectToDB();
        const count = await Product.find({title: {$regex:regex}}).countDocuments();
        var products = await Product.find({title: {$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1)).sort({createdAt:-1});
        // products = products.sort((o,j)=> j.createdAt.getTime() - o.createdAt.getTime());
        return {count, products};
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const fetchProduct = async (id) => {
    try {
        connectToDB();
        return await Product.findById(id);
    } catch (error) {   
        console.log(error);
        throw new Error(error);
    }
}