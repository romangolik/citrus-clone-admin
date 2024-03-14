import dotenv from "dotenv";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StylelintWebpackPlugin from "stylelint-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { BuildOptions } from "./types/config";

export function buildPlugins(
  options: BuildOptions
): webpack.WebpackPluginInstance[] {
  const { paths } = options;

  const environment = dotenv.config().parsed ?? {};
  const envKeys = Object.keys(environment).reduce(
    (prev: Record<string, any>, next) => {
      prev[`process.env.${next}`] = JSON.stringify(environment[next]);
      return prev;
    },
    {}
  );

  const plugins = [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.htmlTemplate,
    }),
    new StylelintWebpackPlugin({
      configFile: ".stylelintrc",
      files: "**/*.scss",
      failOnError: true,
    }),
    new webpack.DefinePlugin(envKeys),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ];

  if (options.isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
    // plugins.push(new BundleAnalyzerPlugin({}));
  }

  return plugins;
}
