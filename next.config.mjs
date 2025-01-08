/** @type {import('next').NextConfig} */
const nextConfig = {
    images :
    {remotePatterns:[
        {hostname : "cdn-icons-png.flaticon.com"},
        {hostname : "lh5.googleusercontent.com"},
        {hostname : "akcdn.detik.net.id"},
        {hostname : "res.cloudinary.com"},
        {hostname : "c8.alamy.com"},
        {hostname : "as2.ftcdn.net"},
    ]
}};

export default nextConfig;
