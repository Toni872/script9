import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    endpoint: process.env.CLOUDFLARE_ENDPOINT,
    region: 'auto',
    signatureVersion: 'v4',
});

export default s3;