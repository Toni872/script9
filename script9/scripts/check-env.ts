
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
console.log('Checking Environment Variables from .env.local...');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Exists (' + process.env.GOOGLE_CLIENT_ID.substring(0, 5) + '...)' : 'MISSING');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Exists' : 'MISSING');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
