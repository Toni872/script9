import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import ServiceDetailClient from '@/components/catalog/ServiceDetailClient';
import { Service } from '@/types';

interface PropertyDetailProps {
    params: {
        id: string;
    };
}

async function getProperty(id: string): Promise<Service | null> {
    try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('properties')
            .select`
          *,
          host:profiles!properties_host_id_fkey(
            id,
            full_name,
            avatar_url,
            email
          ),
          reviews:reviews(count)
        `
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error fetching property server-side:', error);
            return null;
        }

        // Transform data to match Service type (similar to previous client-side logic)
        const transformedProperty: Service = {
            id: data.id,
            title: data.title || data.name,
            description: data.description,
            category: data.category || data.property_type || 'General',
            price: data.price || data.price_per_hour,
            unit: data.unit || 'project',
            location: data.address || data.location,
            city: data.city,
            region: data.region,
            capacity: data.max_guests || data.capacity || 10,
            max_guests: data.max_guests || data.capacity || 10,
            image_urls: Array.isArray(data.image_urls) ? data.image_urls :
                Array.isArray(data.images) ? data.images : [],
            rating: data.average_rating || data.rating || 0,
            review_count: data.review_count || (data.reviews as any)?.[0]?.count || 0,
            features: data.features || [],
            amenities: data.amenities || [],
            provider_id: data.host_id,
            host_id: data.host_id,
            created_at: data.created_at || new Date().toISOString(),
            updated_at: data.updated_at || new Date().toISOString(),
            is_script9_select: data.is_script9_select || false,
            property_type: data.property_type,
        };

        return transformedProperty;
    } catch (error) {
        // Fallback for missing keys or connection issues
        console.error('Critical error fetching property server-side:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PropertyDetailProps): Promise<Metadata> {
    const property = await getProperty(params.id);

    if (!property) {
        return {
            title: 'Servicio no encontrado | Script9',
            description: 'El servicio que buscas no existe o ha sido retirado.',
        };
    }

    return {
        title: `${property.title} | Script9`,
        description: property.description.substring(0, 160),
        openGraph: {
            title: property.title,
            description: property.description.substring(0, 160),
            images: property.image_urls?.[0] ? [property.image_urls[0]] : [],
        },
    };
}

export default async function PropertyDetail({ params }: PropertyDetailProps) {
    const property = await getProperty(params.id);

    return <ServiceDetailClient initialProperty={property} propertyId={params.id} />;
}
