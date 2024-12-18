/** @type {import('next').NextConfig} */
const nextConfig = {
    images :
    {remotePatterns:[
        {hostname : "cdn-icons-png.flaticon.com"},
        {hostname : "lh5.googleusercontent.com"},
    ]
}};

export default nextConfig;
