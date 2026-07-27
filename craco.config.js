// CRACO configuration.
// 1) Dev server host/websocket settings for the preview proxy.
// 2) Tell css-loader to ignore root-absolute url() references (e.g. the hero
//    background images live in /public/images and are served as-is).

function patchCssLoaderUrl(rules) {
  rules.forEach((rule) => {
    if (rule.oneOf) patchCssLoaderUrl(rule.oneOf);
    if (Array.isArray(rule.use)) {
      rule.use.forEach((u) => {
        if (u && typeof u === "object" && typeof u.loader === "string" && u.loader.includes("css-loader") && !u.loader.includes("postcss-loader")) {
          u.options = u.options || {};
          u.options.url = {
            filter: (url) => !url.startsWith("/"),
          };
        }
      });
    }
  });
}

module.exports = {
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: { port: 443 },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      patchCssLoaderUrl(webpackConfig.module.rules);
      return webpackConfig;
    },
  },
};
