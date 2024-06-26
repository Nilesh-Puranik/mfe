const { merge } = require("webpack-merge");
const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederation({
      name: "container",
      remotes: {
        marketingApp: "marketing@http://localhost:8081/remoteEntry.js",
        authApp: "auth@http://localhost:8082/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
      shared: packageJSON.dependencies,
    }),
  ],
};

//from devConfig to commonConfig ... override for same property
module.exports = merge(commonConfig, devConfig);
