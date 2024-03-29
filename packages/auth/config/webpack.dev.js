const { merge } = require("webpack-merge");

const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

//if publipath is never set, scripts are loaded from relative to the url remoteEntry.js is loaded
//as a good practice add publicPath for subapps definitely needed for nested routes
//remoteEntry.js by default path is domainName + /

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederation({
      name: "Auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Auth": "./src/bootstrap",
      },
      // shared: ["react", "react-dom"],
      shared: packageJSON.dependencies,
    }),
  ],
};

//from devConfig to commonConfig ... override for same property
module.exports = merge(commonConfig, devConfig);
