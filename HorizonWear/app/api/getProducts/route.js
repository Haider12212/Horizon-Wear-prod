import Product from "@/models/Product";
import connectDB from "@/libs/connectDB";

export async function GET(request) {
    const data = await request.json();
    const { _id } = data;

    t
    try {
        await connectDB(); // Make sure this function connects to the MongoDB database
        const product = await Product.findById(_id);
        if(!product){
            return NextResponse.json({message: "Product not found"}, 404);
        }
        return NextResponse.json({message: "Product found", product});
    } catch (error) {
        // Handle the error appropriately, e.g., logging or sending an error response
        console.error(error);
        return NextResponse.json({ message: "Error finding product", error }, 500);
    }
    }