import webpack from "webpack";

import { BuildOptions } from "./types/config";
import { buildLoaders } from "./buildLoaders";
import { buildResolve } from "./buildResolve";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    devServer: isDev ? buildDevServer(options) : undefined,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolve(),
    output: {
      filename: "[name].[contenthash:8].js",
      path: paths.output,
      clean: true,
      publicPath: "/",
    },
    performance: {
      hints: false,
    },
    plugins: buildPlugins(options),
  };
}
