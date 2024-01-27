/** @type {import('next').NextConfig} */

const rewrites = () => {
    return [
        {
            source: "/site/get",
            destination: "http://localhost:2333/site/get",
        },
    ];
};

const nextConfig = { rewrites };

export default nextConfig;
