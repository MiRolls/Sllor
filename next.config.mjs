/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
function get_rewrites(origin) {
    return `http://localhost:${process.env.MIROLLS_PORT}` + origin;
}
const rewrites = () => {
    return [
        {
            source: "/site/get",
            destination: get_rewrites("/site/get"),
        },
    ];
};

const nextConfig = {
    rewrites,
    output: "standalone",
    // distDir: "dist",
    experimental: {
        serverMinification: true,
        useDeploymentId: true,
        webpackBuildWorker: true,
        useDeploymentIdServerActions: true,
    },
};

export default nextConfig;
