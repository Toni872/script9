const { Stripe } = require('stripe');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

async function fixBranding() {
    console.log('🔍 Checking Stripe Account Identity...');
    try {
        // 1. Get current account
        const account = await stripe.accounts.retrieve();
        console.log('🆔 Current Stripe Account Name:', account.business_profile?.name || account.settings?.dashboard?.display_name || 'Unknown');
        console.log('ℹ️  Full Data:', JSON.stringify(account.business_profile, null, 2));

        // 2. Try to update
        console.log('✏️  Attempting to rename to "Script9"...');
        const updated = await stripe.accounts.update(account.id, {
            business_profile: {
                name: 'Script9',
                product_description: 'Servicios de Automatización y Desarrollo de Software'
            },
            settings: {
                dashboard: {
                    display_name: 'Script9'
                }
            }
        });

        console.log('✅ SUCCESS! Account renamed to:', updated.settings?.dashboard?.display_name);
        console.log('✅ Business Profile Name:', updated.business_profile?.name);

    } catch (error) {
        console.error('❌ Failed to update Stripe account via API.');
        console.error('   Reason:', error.message);
        console.log('\n💡 This usually means you are using a Standard API Key which cannot modify Account Settings.');
        console.log('👉 SOLUTION: Go to Stripe Dashboard -> Settings -> Public Details and change name manually.');
    }
}

fixBranding();
