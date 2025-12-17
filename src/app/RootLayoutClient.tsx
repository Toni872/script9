"use client";

import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AuthRoleSync from "@/components/AuthRoleSync";

import Header from "@/components/Header";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ReactQueryProvider>
                <div className="flex flex-col min-h-screen">
                    <Suspense fallback={null}>
                        <AuthRoleSync />
                    </Suspense>
                    <Header />
                    {children}
                </div>
            </ReactQueryProvider>
        </SessionProvider>
    );
}
