// This middleware is used to protect the /dashboard page with NextAuth.js authentication. It means that only users who have logged in with NextAuth.js can access the /dashboard page, otherwise they will be redirected to the sign-in page. This middleware uses the getServerSession function from next-auth/next to check the session object on the server side. This function is faster and more secure than using getSession on the client side
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] };
