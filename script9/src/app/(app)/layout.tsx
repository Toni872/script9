'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { AppHeader } from '@/components/dashboard/AppHeader';
import Header from '@/components/Header';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userName, setUserName] = useState('Cliente');
    const [userTier, setUserTier] = useState<'free' | 'starter' | 'pro' | 'enterprise'>('free');
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserName(user.user_metadata?.name || user.email?.split('@')[0] || 'Cliente');

                const { data } = await supabase
                    .from('users')
                    .select('subscription_tier')
                    .eq('email', user.email)
                    .single();

                const profile = data as unknown as { subscription_tier: 'free' | 'starter' | 'pro' | 'enterprise' } | null;

                if (profile?.subscription_tier) {
                    setUserTier(profile.subscription_tier);
                }
            }
        }
        getUser();
    }, [supabase]);

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Header />

            <div className="pt-20 relative z-10">
                <AppHeader userName={userName} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <AppSidebar subscriptionTier={userTier} />
                        </div>
                        <main className="lg:col-span-3">
                            {/* Page Transition Wrapper */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
