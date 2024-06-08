import { authOptions } from "/Git/fornature/src/app/_utilities/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };