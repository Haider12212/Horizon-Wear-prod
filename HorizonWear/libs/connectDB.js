import mongoose from "mongoose";

// connecting to database
const URI = process.env.MONGODB_URI

const connectDB = () => {
    try {
        mongoose.connect(URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log("Database connected successfully")

    } catch (error) {
        console.log(error)

    }
}

export default connectDB

