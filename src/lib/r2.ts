import { S3Client, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || "",
    },
});

// Función para generar una URL pre-firmada para subir imágenes
export async function generateUploadUrl(key: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME || "",
        Key: key,
        ContentType: contentType,
    });
    const url = await getSignedUrl(r2, command, { expiresIn: 3600 }); // URL válida por 1 hora
    return { url, fields: {} };
}

// Función para eliminar una imagen de R2
export async function deleteImage(key: string) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME || "",
        Key: key,
    });
    await r2.send(command);
}

// Función para generar una URL pre-firmada para acceder a imágenes
export async function getImageUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME || "",
        Key: key,
    });
    const url = await getSignedUrl(r2, command, { expiresIn: 3600 }); // URL válida por 1 hora
    return url;
}

// Función para generar múltiples URLs de acceso (útil para galerías)
export async function getMultipleImageUrls(keys: string[]) {
    const urls = await Promise.all(
        keys.map(async (key) => {
            try {
                const url = await getImageUrl(key);
                return { key, url, success: true };
            } catch (error) {
                console.error(`Error getting URL for key ${key}:`, error);
                return { key, url: null, success: false, error: error instanceof Error ? error.message : "Unknown error" };
            }
        })
    );
    return urls;
}
