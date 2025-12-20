/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

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
