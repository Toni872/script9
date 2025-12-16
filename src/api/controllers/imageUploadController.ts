import { NextApiRequest, NextApiResponse } from 'next';
import { getR2Client } from '../../lib/cloudflare';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export const createPresignedUrl = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { fileName, fileType } = req.body;

        if (!fileName || !fileType) {
            return res.status(400).json({ error: 'fileName y fileType son requeridos' });
        }

        const r2Client = getR2Client();
        const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

        if (!bucketName) {
            return res.status(500).json({ error: 'El nombre del bucket de Cloudflare no está configurado' });
        }

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            ContentType: fileType,
        });

        const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

        return res.status(200).json({ url });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al generar URL pre-firmada' });
    }
};
