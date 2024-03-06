"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
  // với các children được ném vào từ file layout thì các children sẽ được gói vào trong session provider. Điều này giúp chúng có thể sử dụng được các method,... từ session.
};
