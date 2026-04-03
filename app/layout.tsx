import type { Metadata } from "next"
import { ClerkProvider, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My App",
  description: "Clerk Auth App",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } =  await auth()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            {!userId ? (
              <>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Register now
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton />
            )}
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}