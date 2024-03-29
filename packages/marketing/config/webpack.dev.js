const { merge } = require("webpack-merge");

const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederation({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./Marketing": "./src/bootstrap",
      },
      // shared: ["react", "react-dom"],
      shared: packageJSON.dependencies,
    }),
  ],
};

//from devConfig to commonConfig ... override for same property
module.exports = merge(commonConfig, devConfig);
