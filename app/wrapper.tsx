"use client"
import { AuthContextProvider } from "./AuthContext";

export default function AuthWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
}
