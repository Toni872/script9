"use client";

import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthRoleSync from "@/components/AuthRoleSync";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ReactQueryProvider>
                <div className="flex flex-col min-h-screen">
                    <Suspense fallback={<div className="h-16 bg-[#003D82]" />}>
                        <AuthRoleSync />
                        <Header />
                    </Suspense>
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
            </ReactQueryProvider>
        </SessionProvider>
    );
}
