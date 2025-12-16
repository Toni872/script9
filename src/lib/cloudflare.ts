// Preparación para migrar al AWS SDK v3
// Reemplazar las importaciones y métodos del SDK v2 con sus equivalentes en el SDK v3
// Por ejemplo, usar @aws-sdk/client-s3 en lugar de aws-sdk

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export const getR2Client = () => {
    const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
    const endpoint = process.env.CLOUDFLARE_ENDPOINT;

    if (!accessKeyId || !secretAccessKey || !endpoint) {
        throw new Error('Faltan configuraciones de Cloudflare R2 en las variables de entorno');
    }

    return new S3Client({
        endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        region: 'auto',
    });
};

export const uploadObject = async (
    client: S3Client,
    bucketName: string,
    key: string,
    body: Buffer | Uint8Array | Blob | string
) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
    });
    return await client.send(command);
};

export const getObject = async (
    client: S3Client,
    bucketName: string,
    key: string
) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    });
    return await client.send(command);
};
