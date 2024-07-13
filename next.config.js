/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "images.pexels.com"
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com"
            },

        ]
    }
}

module.exports = nextConfig
