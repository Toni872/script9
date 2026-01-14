"use client";

import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AuthRoleSync from "@/components/AuthRoleSync";
import CommercialAgentWidget from "@/components/ai/CommercialAgentWidget";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

    return (
        <SessionProvider>
            <ReactQueryProvider>
                <div className="flex flex-col min-h-screen">
                    <Suspense fallback={null}>
                        <AuthRoleSync />
                    </Suspense>
                    {!isDashboard && <Header />}
                    {children}
                    {!isDashboard && <CommercialAgentWidget />}
                </div>
            </ReactQueryProvider>
        </SessionProvider>
    );
}
