import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <main
            className={
              "flex h-screen w-full overflow-hidden bg-gradient-to-tl from-zinc-950 to-zinc-700 text-gray-50 " +
              poppins.className
            }
          >
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
