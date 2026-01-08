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
        // 1. Try fetching from Supabase (for real deployment)
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('properties')
            .select(`
              *,
              host:profiles!properties_host_id_fkey(
                id,
                full_name,
                avatar_url,
                email
              ),
              reviews:reviews(count)
            `)
            .eq('id', id)
            .single();

        let serviceData = data;

        // 2. If not found in DB, check Mock Data (for Development/Demo)
        if (error || !data) {
            const { getMockServiceById } = await import('@/lib/mockData');
            const mockService = getMockServiceById(id);

            if (mockService) {
                // Transform mock data to match Service interface roughly
                serviceData = mockService;
            } else {
                console.error('Service not found in DB or Mock Data:', id);
                return null;
            }
        }

        const dataToTransform = serviceData;

        // Transform data to match Service type
        const transformedProperty: Service = {
            id: dataToTransform.id,
            title: dataToTransform.title || dataToTransform.name,
            description: dataToTransform.description,
            category: dataToTransform.category || dataToTransform.property_type || 'General',
            price: dataToTransform.price || dataToTransform.price_per_hour,
            unit: dataToTransform.unit || 'project',
            location: dataToTransform.address || dataToTransform.location,
            city: dataToTransform.city,
            region: dataToTransform.region,
            capacity: dataToTransform.max_guests || dataToTransform.capacity || 10,
            max_guests: dataToTransform.max_guests || dataToTransform.capacity || 10,
            image_urls: dataToTransform.image_urls || [],
            rating: dataToTransform.average_rating || dataToTransform.rating || 0,
            review_count: dataToTransform.review_count || (dataToTransform.reviews as any)?.[0]?.count || 0,
            features: dataToTransform.features || [],
            amenities: dataToTransform.amenities || [],
            provider_id: dataToTransform.host_id,
            host_id: dataToTransform.host_id,
            created_at: dataToTransform.created_at || new Date().toISOString(),
            updated_at: dataToTransform.updated_at || new Date().toISOString(),
            is_script9_select: dataToTransform.is_script9_select || false,
            property_type: dataToTransform.property_type,
            tech_stack: dataToTransform.tech_stack,
            price_display_text: dataToTransform.price_display_text,
            delivery_time: dataToTransform.delivery_time,
            maintenance_support: dataToTransform.maintenance_support,
        };

        return transformedProperty;
    } catch (error) {
        console.error('Error fetching property:', error);
        return null; // Handle gracefully
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
