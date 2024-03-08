//component này sẽ trả lại một form cho người dùng register
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  // dùng state để quản lý data ở các input và error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();// prevent page reload khi submit
    // khi submit xảy ra thì trước tiên kiểm tra xem có thiếu thông tin gì không
    // nếu thiếu name hoặc email hoặc password thì sẽ set error
    // return để quay lại, vẫn ở nguyên page, nhưng không thực hiện đoạn code dưới.
    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }
    
    try {
      // nếu đã đủ các thông tin thì tiếp tục check xem user đã tồn tại chưa
      // gọi api để check user exist với data là email được người dùng nhập vào
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // lấy data được gửi về
      const { user } = await resUserExists.json();
      // nếu đã tồn tại user thì return không thực hiện đoạn code dưới nữa
      if (user) {
        setError("User already exists.");
        return;
      }
      // nếu user chưa tồn tại thì gọi api register
      // với các data được người dùng nhập vào
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      // nếu register thành công thì reset form, xoá thông tin đã nhập và quay về trang chủ
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else { // nếu không register thành công thì set lỗi
        console.log("User registration failed.");
      }
    } catch (error) { // trong toàn bộ quá trình try nếu có error gì về cú pháp,... thì catch vào đây để tránh crash chương trình.
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {/* nếu có error thì mới hiển thị */}
          {error && ( 
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          {/* show một link để nếu user đã có account thì đăng nhập thay vì đăng ký. link này sẽ về trang chủ (hiển thị form login hoặc tự route sang dashboard nếu đã đăng nhập) */}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
