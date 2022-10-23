/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: (() => {
    let compilerConfig = {};
    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        reactRemoveProperties: { properties: ["^data-testid$"] },
      };
    }
    return compilerConfig;
  })(),
};

module.exports = nextConfig;
