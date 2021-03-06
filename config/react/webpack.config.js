const path = require("path");
const webpack = require("webpack");

const { copy } = require("./utils");
const REACT_BASE_PATH = "../../src/react/";

copy();

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  target: "electron-renderer",
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "cheap-module-eval-source-map",
  entry: "./index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@Components": path.resolve(__dirname, REACT_BASE_PATH + "components/"),
      "@Shared": path.resolve(__dirname, REACT_BASE_PATH + "shared/")
    }
  },
  output: {
    path: path.resolve(__dirname, "../../dist/react"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, REACT_BASE_PATH),
    disableHostCheck: true,
    port: 8080,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /.tsx{0,1}$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
