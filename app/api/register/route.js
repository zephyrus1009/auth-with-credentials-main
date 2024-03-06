// file này là một api route nhằm mục đích register user.
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// ở đây phải là POST chứ không phải GET
// vì đây là API hỗ trợ việc tạo user mới
// khi gọi đến API này thì sẽ phải post thông tin tới đây (ví dụ như email và password)
// API này sẽ nhận các thông tin được post tới đó để xử lý, nên đây phải là POST.

export async function POST(req) {
  try {
    // lấy ra name, email, password từ request
    const { name, email, password } = await req.json();
    // mã hoá password với bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    // tạo document mới, với password được thay bằng password đã được mã hoá
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
