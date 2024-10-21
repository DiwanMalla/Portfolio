import NextAuth from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = await connectToDatabase();
        const collection = db.collection("admin");

        // Check if the user exists
        const user = await collection.findOne({
          email: credentials.email, // Correct access to email and password
        });

        // Validate the password (in production, this should be hashed)
        if (user && user.password === credentials.password) {
          return { id: user._id, email: user.email }; // Return the user if credentials are valid
        }

        // Return null if user data is incorrect
        return null;
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Specify the custom sign-in page
  },
});
