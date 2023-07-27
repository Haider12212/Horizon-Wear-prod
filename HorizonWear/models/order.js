import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNo:{
        type: String,
        required: [true, 'Order number is required'],
        unique: true,
    },
    fullName:{
        type: String,
        required: [true, 'Full name is required'],
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
    },
    phoneNo:{
        type: String,
        required: [true, 'Phone number is required'],
    },
    Products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    }],
    ProductName: [{
        type: Schema.Types.String,
        ref: 'Product',
        required: [true, 'Product is required'],
    }],
    ProductQuantity: {
        type: Array,
        required: [true, 'Product quantity is required'],
    },
    ProductImage: [{
        type: Schema.Types.String,
        ref: 'Product',
        required: [true, 'Product image is required'],
    }],
    
    totalAmount:{
        type: Number,
        required: [true, 'Total amount is required'],
    },
    status:{
        type: String,
        enum: ['pending', 'processing', 'completed', 'declined'],
        default: 'pending',
    }

}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;