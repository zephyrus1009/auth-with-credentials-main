import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
// trang chủ này mặc định là hiện ra login form.
// nếu chưa đăng nhập thì hiện trang này
// còn nếu đã đăng nhập thì tự chuyển sang trang dashboard, hiện info người dùng.
export default async function Home() {
  const session = await getServerSession(authOptions);
// lấy thông tin session 
  if (session) redirect("/dashboard");
// nếu đã đăng nhập thì redirect đến dashboar
  return (
    <main>
      <LoginForm />
      {/* nếu chưa đăng nhập thì hiện login form */}
    </main>
  );
}
