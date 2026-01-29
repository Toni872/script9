/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "base-uri 'self'",
                            "object-src 'none'",
                            "frame-ancestors 'none'",
                            "form-action 'self'",
                            // Imagenes: propios, data:, dominios de next.config
                            "img-src 'self' data: blob: https://images.unsplash.com https://assets.mixkit.co https://cdn.script9.es https://lh3.googleusercontent.com https://*.r2.dev https://raw.githubusercontent.com https://upload.wikimedia.org https://cdn.worldvectorlogo.com https://static.cdnlogo.com https://cdn.simpleicons.org https://*.tile.openstreetmap.org",
                            // Scripts: propios, unsafe-inline/eval (dev/maps), stripe, google maps
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com",
                            // Styles: propios, inline, google fonts, leaflet css
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
                            // Fonts: propios, google fonts, data
                            "font-src 'self' https://fonts.gstatic.com data:",
                            // Connect: propios, stripe, google maps
                            "connect-src 'self' https://api.stripe.com https://maps.googleapis.com https://*.tile.openstreetmap.org",
                            // Frames: stripe, cal.com
                            "frame-src 'self' https://js.stripe.com https://cal.com",
                            // Workers
                            "worker-src 'self' blob:",
                            'upgrade-insecure-requests',
                        ].join('; '),
                    },
                ],
            },
        ];
    },

    // Configuración de imágenes
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'assets.mixkit.co',
            },
            {
                protocol: 'https',
                hostname: 'cdn.script9.es',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'pub-3ef540b3cd2345318e67fed754584739.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'cdn.worldvectorlogo.com',
            },
            {
                protocol: 'https',
                hostname: 'static.cdnlogo.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
        ],
    },

    // Configuración de webpack para path aliases
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
        };
        return config;
    },

    // Optimizaciones para producción
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
