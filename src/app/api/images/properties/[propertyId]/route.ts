import { NextRequest, NextResponse } from 'next/server';
import { CatalogService } from '@/services/catalogService';
import { getImageUrl } from '@/lib/r2';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Esquema de validación para asociar imagen a propiedad
const associateImageSchema = z.object({
    imageKey: z.string().min(1, 'Image key is required'),
    isPrimary: z.boolean().optional().default(false),
    caption: z.string().optional(),
});

/**
 * GET /api/images/properties/[propertyId]
 * Obtener todas las imágenes de una propiedad con URLs pre-firmadas
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const property = await CatalogService.getServiceById(params.propertyId);
        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Property not found' },
                { status: 404 }
            );
        }

        // Use property.images or adjust to the correct field name that contains the images array
        type PropertyImage = {
            id: string;
            image_url: string;
            is_primary: boolean;
            created_at: string;
        };

        type PropertyWithImages = {
            property_images?: PropertyImage[];
            images?: PropertyImage[];
            [key: string]: unknown;
        };

        const typedProperty = property as unknown as PropertyWithImages;
        const imagesArray: PropertyImage[] = typedProperty.property_images || typedProperty.images || [];
        const imagesWithUrls = await Promise.all(
            imagesArray.map(async (image: PropertyImage) => {
                try {
                    const url = await getImageUrl(image.image_url);
                    return {
                        id: image.id,
                        url: url,
                        key: image.image_url,
                        isPrimary: image.is_primary,
                        createdAt: image.created_at,
                    };
                } catch (error) {
                    console.error(`Error getting URL for image ${image.id}:`, error);
                    return {
                        id: image.id,
                        url: null,
                        key: image.image_url,
                        isPrimary: image.is_primary,
                        createdAt: image.created_at,
                        error: 'Failed to generate URL',
                    };
                }
            })
        );

        return NextResponse.json({
            success: true,
            data: {
                propertyId: params.propertyId,
                images: imagesWithUrls,
                count: imagesWithUrls.length,
            },
        });
    } catch (error) {
        console.error('Error fetching property images:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch property images' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/images/properties/[propertyId]
 * Asociar una imagen cargada a una propiedad
 */
export async function POST(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        const property = await PropertyService.getPropertyById(params.propertyId);
        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Property not found' },
                { status: 404 }
            );
        }

        if (property.host_id !== session.user.id && session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'You can only manage images for your own properties' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = associateImageSchema.parse(body);

        try {
            await getImageUrl(validatedData.imageKey);
        } catch {
            return NextResponse.json(
                { success: false, error: 'Image not found in storage' },
                { status: 404 }
            );
        }

        const propertyImage = await CatalogService.addPropertyImage(
            params.propertyId,
            validatedData.imageKey,
            validatedData.isPrimary
        );

        const imageUrl = await getImageUrl(validatedData.imageKey);
        return NextResponse.json(
            {
                success: true,
                data: {
                    id: propertyImage.id,
                    url: imageUrl,
                    key: validatedData.imageKey,
                    isPrimary: validatedData.isPrimary,
                    propertyId: params.propertyId,
                },
                message: 'Image associated with property successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error associating image with property:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid image data', details: error.issues },
                { status: 400 }
            );
        }
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to associate image with property' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/images/properties/[propertyId]
 * Eliminar una imagen de una propiedad
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const imageId = searchParams.get('imageId');
        if (!imageId) {
            return NextResponse.json(
                { success: false, error: 'Image ID is required' },
                { status: 400 }
            );
        }

        const property = await PropertyService.getPropertyById(params.propertyId);
        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Property not found' },
                { status: 404 }
            );
        }

        if (property.host_id !== session.user.id && session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'You can only manage images for your own properties' },
                { status: 403 }
            );
        }

        const typedProperty = property as { property_images?: { id: string }[]; images?: { id: string }[] };
        const imagesArray = typedProperty.property_images || typedProperty.images || [];
        const imageExists = imagesArray.some((img: { id: string }) => img.id === imageId);
        if (!imageExists) {
            return NextResponse.json(
                { success: false, error: 'Image not found for this property' },
                { status: 404 }
            );
        }

        await CatalogService.removePropertyImage(imageId);

        return NextResponse.json({
            success: true,
            message: 'Image removed from property successfully',
        });
    } catch (error) {
        console.error('Error removing image from property:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to remove image from property' },
            { status: 500 }
        );
    }
}