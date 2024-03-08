// component này về cơ bản sẽ hiển thị ra một form để người dùng có thể login.
// vì là form nên sẽ có các input, và giá trị của input sẽ được quản lý bởi các state,... nên cần phải là client component.
// ngoài ra component này còn hiển thị một đường link để nếu user chưa đăng ký thì sẽ bấm vào link để chuyển sang page register.
"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

//Là client component thì không thể là async function
// Do đó phần nào muốn dùng async await thì phải làm thành function con bên trong
export default function LoginForm() {
  // dùng state để chứa data từ các input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // function bên trong client component thì có thể là async
  // hàm xử lý sự kiện submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ngăn không cho page reload

    try {
      // signIn với provider name là credentials (lưu ý cần tên)
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) { // nếu res.error tức đăng nhập không thành công thì set lỗi để hiển thị và nhờ có return sẽ ở lại trang mà không chạy đoạn router ở dưới
        setError("Invalid Credentials");
        return;
      }
// nếu đăng nhập thành công thì chuyển sang page dashboard
      router.replace("dashboard");
    } catch (error) { // có lỗi gì khác như về cú pháp,... thì console.log ra chứ crash chương trình.
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            Login
          </button>
          {/* nếu có error thì mới hiển thị thông tin về error, còn không thì không hiển thị gì hết */}
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
