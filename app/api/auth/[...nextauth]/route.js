import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// CredentialsProvider là provider hỗ trợ đăng nhập của nextauth. Các provider khác như google,github,...
import bcrypt from "bcryptjs";
// thêm bcrypt để hỗ trợ mã hoá password. Người dùng nhập password của mình vào thì password đó ta sẽ dùng bcrypt để mã hoá rồi mới gửi lên lưu trên database để tăng bảo mật.

//authOptions này sẽ chứa các providers
export const authOptions = {
  
  // providers sẽ là một mảng chứa các provider được sử dụng và các option cần thiết để dùng khi đăng nhập với signin. Lưu ý khi dùng signIn phải pass tên của provider vào.
  // ở đây ta chỉ dùng một provider duy nhất là  CredentialsProvider.
  providers: [
    CredentialsProvider({
      name: "credentials", // tên của provider
      credentials: {}, // chứa thông tin được pass lại từ hàm signIn. Ở app này ta sẽ pass vào email và password

      // hàm này sẽ lấy các thông tin từ credentials để liên kết với mongodb
      async authorize(credentials) {
        const { email, password } = credentials;// lấy email và password từ credentials
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
// kết nối với mongodb và tìm kiếm user thông qua email
          if (!user) { // nếu không tìm được user thì kết thúc luôn
            return null;
          }
// nếu tìm được user thì dùng bcrypt để so sánhpassword thu được từ credential với password được lưu trên mongodb
          const passwordsMatch = await bcrypt.compare(password, user.password);
// nếu password không đúng thì dừng luôn
          if (!passwordsMatch) {
            return null;
          }
// nếu password đúng thì trả lại user
// từ đó session sẽ chứa thông tin user này?
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
