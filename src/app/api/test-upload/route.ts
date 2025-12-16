import { NextRequest, NextResponse } from 'next/server';
import { getR2Client } from '@/lib/cloudflare';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No se proporcionó ningún archivo' },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF, WebP)' },
                { status: 400 }
            );
        }

        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const fileName = `test-${timestamp}-${file.name}`;

        // Convertir el archivo a Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Obtener el cliente de R2 y subir
        const r2Client = getR2Client();

        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });

        await r2Client.send(command);

        // Generar URL pública
        const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName,
            size: file.size,
            type: file.type,
        });
    } catch (error) {
        console.error('Error al subir imagen:', error);
        return NextResponse.json(
            { error: 'Error al subir la imagen al servidor' },
            { status: 500 }
        );
    }
}

