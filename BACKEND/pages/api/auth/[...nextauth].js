import NextAuth from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
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

        // Log the credentials received
        console.log("Credentials received:", credentials);

        const user = await collection.findOne({
          email: credentials.email,
        });

        // Log the retrieved user
        console.log("User retrieved from database:", user);

        // Validate password (ensure you hash the password in production)
        if (user && user.password === credentials.password) {
          console.log("User authenticated:", user);
          return { id: user._id, email: user.email };
        }

        console.error(
          "Authentication failed: User not found or password incorrect."
        );
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
