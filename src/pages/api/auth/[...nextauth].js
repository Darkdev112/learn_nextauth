import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider  from "next-auth/providers/credentials";
import connectMongo from "../../../../database/connect";
import Users from "../../../../models/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_SECRET                        
        }),
        GithubProvider({
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECRET 
        }),
        CredentialsProvider({
            name : "Credentials",
            async authorize(credentials, req){
                connectMongo().catch({error : "Connection Failed...."})

                //check user existence
                const result = await Users.findOne({email : credentials.email})
                if(!result)
                {
                    throw new Error("No user found with email please sign up")
                }
                
                //compare()
                const checkPassword = await compare(credentials.password, result.password);

                if(!checkPassword || (result.email !==credentials.email))
                {
                    throw new Error("Username and Password don't match");    
                }

                return result;
            }
        })
    ],
    secret : "IVW3zUPnY6+FYpJf1uN8yL6Ks7ljdsGtjCwGcLO0zm4="
})

