import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "hasaan", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}