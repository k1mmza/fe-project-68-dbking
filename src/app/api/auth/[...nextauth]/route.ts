import NextAuth from "next-auth";
import { authOptions } from "./authOption"; // Path to your new file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };