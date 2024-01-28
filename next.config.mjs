/** @type {import('next').NextConfig} */
const rewrites = () => {
    return [
        {
            source: "/site/get",
            destination: `${process.env.MIROLLS_URL}/site/get`,
        },
    ];
};

const nextConfig = {
    rewrites,
    output: "standalone",
    distDir: "dist",
    experimental: {
        serverMinification: true,
        useDeploymentId: true,
        webpackBuildWorker: true,
        useDeploymentIdServerActions: true,
    },
};

export default nextConfig;
