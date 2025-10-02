

import dbConnect from "@/app/lib/dbConnect";
import getDataFromToken from "@/app/lib/getDataFromTheToken";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request){
try {
  const userId = await getDataFromToken(request)
  const {cartData} = await request.json()
  await dbConnect()
  const user = await User.findById(userId)
  user.cartItems = cartData;
  await user.save();
 return NextResponse.json({ success: true, msg: 'Cart added to user cart successfully.'}, { status: 200 });

} catch (error) {
  console.log(error.message);
  
  return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  
}
}



export async function GET(request){
  try{
    await dbConnect()
 const userId = await getDataFromToken(request)
 const user = await User.findById(userId)
 const {cartItems} = user;
 return NextResponse.json({success:true, cartItems})
  }catch(error){
return NextResponse.json({ success: false, msg: error.message }, { status: 500 });

  }
}