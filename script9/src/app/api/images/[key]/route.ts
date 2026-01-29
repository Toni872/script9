import { NextRequest, NextResponse } from 'next/server';
import { getImageUrl } from '@/lib/r2';

/**
 * GET /api/images/[key]
 * Obtener URL pre-firmada para acceder a una imagen
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { key: string } }
) {
    try {
        // Decodificar la clave (puede contener caracteres especiales)
        const decodedKey = decodeURIComponent(params.key);

        // Validar que la clave tenga un formato válido
        if (!decodedKey || decodedKey.length < 1) {
            return NextResponse.json(
                { success: false, error: 'Invalid image key' },
                { status: 400 }
            );
        }

        // Generar URL pre-firmada para acceso
        const imageUrl = await getImageUrl(decodedKey);

        return NextResponse.json({
            success: true,
            data: {
                url: imageUrl,
                key: decodedKey,
                expiresIn: 3600, // 1 hora
            },
        });
    } catch (error) {
        console.error('Error getting image URL:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to get image URL' },
            { status: 500 }
        );
    }
}