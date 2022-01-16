module.exports = {
    env: {
        SERVER_URI: process.env.SERVER_URI,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
