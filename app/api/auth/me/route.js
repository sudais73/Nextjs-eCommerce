import dbConnect from "@/app/lib/dbConnect";
import getDataFromToken from "@/app/lib/getDataFromTheToken";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect()
    const userId = getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}
