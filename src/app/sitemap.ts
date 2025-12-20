import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createServerSupabaseClient();
    const baseUrl = 'https://script9.com';

    // Static Routes
    const routes = [
        '',
        '/catalogo',
        '/como-funciona',
        '/contacto',
        '/faq',
        '/login',
        '/registro',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Routes (Services)
    let services: any[] = [];
    try {
        const { data, error } = await supabase
            .from('properties')
            .select('id, updated_at')
            .limit(100);

        if (data) {
            services = data.map((service) => ({
                url: `${baseUrl}/catalogo/${service.id}`,
                lastModified: service.updated_at || new Date().toISOString(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }));
        }
    } catch (e) {
        console.error('Error generating sitemap:', e);
    }

    return [...routes, ...services];
}
