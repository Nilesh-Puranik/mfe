const { merge } = require("webpack-merge");
const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

//here webpack does some optimizations minifying
const prodConfig = {
  mode: "production",
  output: {
    // name convention to address caching issues [contenthash] - hash of content
    filename: "[name].[contenthash].js",
    //search *.js files in this path instead of root path
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederation({
      // host module
      name: "container",
      remotes: {
        marketingApp: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
