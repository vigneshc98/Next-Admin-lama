import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDB } from "./lib/utils"
import { User } from "./lib/models"
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        connectToDB();
        const user = await User.findOne({username:credentials.username});
    

        if(!user) throw new Error("Wrong username Credential!");

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if(!isPasswordCorrect) throw new Error("Wrong password Credential!");

        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to login");
    }
}

export const {signIn, signOut, auth} = NextAuth( {
    ...authConfig,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        async authorize(credentials) {
            try {
                const user = await login(credentials);
                return user;
            } catch (error) {
                return null;
            }
        }
    }),
  ],
  //adding username and image to token
  callbacks:{
    async jwt({token, user}){
        if(user){
            token.username = user.username;
            token.img = user.img
        }
        return token;
    },
    //passing token information to session
    async session({session, token}){
        if(token){
            session.user.username = token.username;
            session.user.img = token.img
        }
        return session;
    },
  }
});

// export default NextAuth(signIn, signOut, auth)