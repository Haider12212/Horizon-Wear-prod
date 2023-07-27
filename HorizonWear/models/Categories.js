import mongoose from "mongoose";
const Schema = mongoose.Schema;


const catergorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    }
})

const Categories = mongoose.models.Categories || mongoose.model('Categories', catergorySchema);
export default Categories;
