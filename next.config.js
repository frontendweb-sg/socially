const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            }
        ]
    }
}

module.exports = nextConfig
