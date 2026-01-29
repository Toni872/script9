import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/host/', '/dashboard/', '/checkout/'],
        },
        sitemap: 'https://script9.com/sitemap.xml',
    };
}
