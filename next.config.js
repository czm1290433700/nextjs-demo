const path = require("path");

const semi = require("@douyinfe/semi-next").default({});

module.exports = semi({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
  images: {
    domains: ["127.0.0.1"],
  },
});
