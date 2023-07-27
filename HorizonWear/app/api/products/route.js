import connectDB from "@/libs/connectDB";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request){
    const {title, description, slug, price, images, category, stock} = await request.json();
    await connectDB();
    Product.create({
        title,
        description,
        slug,
        price,
        images,
        category,
        stock,
    })
    return NextResponse.json({message: "Product created successfully"})
}


export async function GET(){
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);

}
export async function DELETE(request){
  const data = await request.json();
    const { _id } = data;
    console.log(_id);
    await connectDB();
    await Product.findByIdAndDelete(_id);
    return NextResponse.json({message: "Product deleted successfully"})
}

export async function PUT(request) {
    const data = await request.json();
    const { _id } = data;
    console.log(_id);
    console.log(data);

    try {
      await connectDB(); // Make sure this function connects to the MongoDB database
      const updatedProduct = await Product.findByIdAndUpdate(_id, data, { new: true });
      
      if (!updatedProduct) {
        return NextResponse.json({ message: "Product not found" }, 404);
      }
      
      return NextResponse.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      // Handle the error appropriately, e.g., logging or sending an error response
      console.error(error);
      return NextResponse.json({ message: "Error updating product", error }, 500);
    }
  }



