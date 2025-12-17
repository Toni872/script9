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
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getTier() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase.from('users').select('subscription_tier').eq('email', user.email).single();
                if (profile?.subscription_tier) setUserTier(profile.subscription_tier as any);
            }
        }
        getTier();
    }, [supabase]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <DashboardOverview subscriptionTier={userTier} />
            {/* <OrderList /> handles its own headers/empty states */}
            <OrderList />
        </div>
    );
}
