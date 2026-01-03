'use client';

import { DashboardOverview } from '@/components/dashboard/Overview';
import { OrderList } from '@/components/dashboard/OrderList';

// Note: subscriptionTier is not passed from layout prop here in simplified version, 
// Overview handles its own data or we might need a context. 
// For now Overview has defaults or fetches data? Overview fetches data but not tier?
// Overview needs tier for "Free" view. 
// We should pass it or use context. 
// To allow Overview to work standalone, we'll let it handle things or use a hook.
// Actually, Overview accepts subscriptionTier prop.
// In the new layout structure, how do we pass tier to page?
// We can use a Context Provider in the layout! Or fetch again. 
// Fetching again is easiest for now.

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UsuarioDashboard() {
    const [userTier, setUserTier] = useState<'free' | 'starter' | 'pro' | 'enterprise'>('free');
    const [userName, setUserName] = useState<string>('');
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUserData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Get name
                const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario';
                setUserName(name);

                // Get tier
                const { data } = await supabase.from('users').select('subscription_tier').eq('email', user.email).single();
                const profile = data as unknown as { subscription_tier: 'free' | 'starter' | 'pro' | 'enterprise' } | null;

                if (profile?.subscription_tier) setUserTier(profile.subscription_tier);
            }
        }
        getUserData();
    }, [supabase]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Hola, <span className="text-emerald-400">{userName}</span>
                    </h1>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                        Panel de Control
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span className="text-sm font-mono text-slate-500">v2.0.4</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                        {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                </div>
            </div>

            <DashboardOverview subscriptionTier={userTier} />
            <OrderList />
        </div>
    );
}
