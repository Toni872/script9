'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { AppHeader } from '@/components/dashboard/AppHeader';

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

                const { data: profile } = await supabase
                    .from('users')
                    .select('subscription_tier')
                    .eq('email', user.email)
                    .single();

                if (profile?.subscription_tier) {
                    // @ts-ignore
                    setUserTier(profile.subscription_tier);
                }
            }
        }
        getUser();
    }, [supabase]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <AppHeader userName={userName} />

            <div className="container-script9 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <AppSidebar subscriptionTier={userTier} />
                    </div>
                    <main className="lg:col-span-3">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
