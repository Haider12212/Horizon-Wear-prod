import connectDB from "@/libs/connectDB";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    orderNo,
    fullName,
    email,
    address,
    phoneNo,
    Products,
    ProductName,
    ProductQuantity,
    ProductImage,
    totalAmount,
    status,
  } = await request.json();
  await connectDB();
  try {
    Order.create({
      orderNo,
      fullName,
      email,
      address,
      phoneNo,
      Products,
      ProductName,
      ProductQuantity,
      ProductImage,
      totalAmount,
      status,
    });
  } catch (error) {
    return NextResponse.error(error);
  }
  return NextResponse.json({ message: "Order created successfully" });
}
export async function GET() {
  await connectDB();
  const orders = await Order.find({});
  return NextResponse.json(orders);
}
export async function PUT(request) {
  const data = await request.json();
  const { _id } = data;

  try {
    await connectDB(); // Make sure this function connects to the MongoDB database
    const updateOrder = await Order.findByIdAndUpdate(_id, data, { new: true });
    if(!updateOrder){
      return NextResponse.json({message: "Order not found"}, 404);
    }
    return NextResponse.json({message: "Order updated successfully", updateOrder});
  } catch (error) {
    // Handle the error appropriately, e.g., logging or sending an error response
    console.error(error);
    return NextResponse.json({ message: "Error updating order", error }, 500);
  }
}
export async function DELETE(request){
  const data = await request.json();
    const { _id } = data;
    console.log(_id);
    await connectDB();
    await Order.findByIdAndDelete(_id);
    return NextResponse.json({message: "Product deleted successfully"})
}

  

