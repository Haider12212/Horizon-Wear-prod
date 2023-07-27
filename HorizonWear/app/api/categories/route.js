import { NextResponse } from "next/server";
import Categories from "@/models/Categories";
import {connectDB} from "@/util/db";
export async function GET(){
    await connectDB();
    const categories = await Categories.find({});
    return NextResponse.json(categories);
}

 

export async function POST(request){
    await connectDB();
    const { name } = await request.json()
    const Category = new Categories({name})
    await Category.save()
    return NextResponse.json({message: "Category created successfully"})
}

// Delete Category API 
export async function DELETE(request){
    await connectDB();
    // 
    await Categories.findOneAndDelete(request)
    return NextResponse.json({message: "Category deleted successfully"})
}
    
