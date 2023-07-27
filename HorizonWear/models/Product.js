import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description:{
        type: String,
        required: [true, 'Product description is required'],
    },
    slug:{
        type: String,
        required: [true, 'Product slug is required'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    images: {
        type: [String],
        required: [true, 'Product image is required'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
    },

}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);



export default Product;

