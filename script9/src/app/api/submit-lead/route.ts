import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // This variable must be set in your .env.local file
        const webhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('SERVER ERROR: N8N_WEBHOOK_URL is missing in .env.local');
            return NextResponse.json(
                { error: 'Server misconfiguration: No Webhook URL' },
                { status: 500 }
            );
        }

        console.log('--- SUBMITTING LEAD ---');
        console.log('Target URL:', webhookUrl);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...body,
                submittedAt: new Date().toISOString(),
                source: 'script9-website-contact-form',
                // Adding BANT placeholders just in case N8N expects them flat for now
                // (Though your N8N flow likely processes raw text)
                bant_budget: '',
                bant_authority: '',
                bant_need: '',
                bant_timeline: ''
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('N8N Error Response:', response.status, response.statusText, errorText);
            throw new Error(`N8N Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json().catch(() => ({}));
        console.log('--- N8N SUCCESS ---');

        return NextResponse.json({ success: true, apiResponse: data });
    } catch (error: any) {
        console.error('Lead submission crash:', error.message);
        return NextResponse.json(
            { error: `Failed to submit lead: ${error.message}` },
            { status: 500 }
        );
    }
}
