import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('avatar') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No se proporcionó ningún archivo' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'El archivo debe ser una imagen' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'La imagen debe ser menor a 5MB' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `avatars/${session.user.id}/${crypto.randomUUID()}.${fileExtension}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudflare R2
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
                Key: fileName,
                Body: buffer,
                ContentType: file.type,
            })
        );

        // Generate public URL
        const avatarUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;

        // Update user in database
        const supabase = createServerSupabaseClient();

        const { error: updateError } = await supabase
            .from('users')
            .update({
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            })
            .eq('id', session.user.id);

        if (updateError) {
            console.error('Error updating avatar URL:', updateError);
            return NextResponse.json(
                { error: 'Error al actualizar avatar' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Avatar subido exitosamente',
            avatarUrl,
        });

    } catch (error) {
        console.error('Error uploading avatar:', error);
        return NextResponse.json(
            { error: 'Error al subir imagen' },
            { status: 500 }
        );
    }
}

// En Next.js App Router, no se necesita config.api.bodyParser
// FormData se maneja automáticamente

