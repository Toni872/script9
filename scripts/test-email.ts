
import { Resend } from 'resend';

// NOTE: Add your RESEND_API_KEY to .env first!
const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
    const fromEmail = process.env.FROM_EMAIL || 'notifications@script9.com';
    // Note: 'onbording@resend.dev' is the default for testing without domain verification
    const toEmail = 'delivered@resend.dev';

    try {
        const data = await resend.emails.send({
            from: fromEmail.includes('resend') ? fromEmail : 'onboarding@resend.dev',
            to: toEmail,
            subject: 'Test Email from Script9',
            html: '<p>Si ves esto, <strong>Script9 Email System</strong> está funcionando 🚀</p>'
        });

        console.log('✅ Test Email Sent Successfully!');
        console.log('ID:', data.id);
    } catch (error) {
        console.error('❌ Error sending test email:', error);
    }
}

testEmail();
