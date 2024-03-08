// trang register, trang này sẽ hiển thị ra form để register
// trang sẽ chỉ hiển thị khi user chưa đăng nhập
// còn nếu đã đăng nhập thì sẽ redirect về trang dashboard
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
//vì cần kết nối lấy session info, nên phải để là async function
// vì là async function nên cần phải là server component.
// vì là server component nên cần phải tách register form ra thành component riêng, vì register form có button,... nên cần phải là client component.
export default async function Register() {
  const session = await getServerSession(authOptions);
  // lấy session info
  // nếu có session, tức là user đã đăng nhập thì redirect về dashboard luôn, không hiển thị register form
  if (session) redirect("/dashboard");
  // nếu chưa đăng nhập thì mới ở lại trang, hiển thị register form.
  return <RegisterForm />;
}
