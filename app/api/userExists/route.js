// file này là api dùng để tìm xem user đã có trên database chưa
//
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    // lấy ra thông tin email từ request
    const { email } = await req.json();
    // dùng email để tìm user trên database
    // ở đây chỉ muốn giả về _id của user
    // nếu tồn tại user thì user giả về sẽ là id, còn nếu không là null.
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
