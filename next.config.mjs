/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['*'],
    },
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'https://link-share-liard.vercel.app/api/:path*',
            },
        ];
    },
    headers: async () => {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, Content-Type, Accept',
                    },
                ],
            }
        ]
    }
};

export default nextConfig;
