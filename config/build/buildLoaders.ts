import path from "path";
import webpack from "webpack";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const styleLoader = {
    test: /\.(s*)css$/i,
    exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resourcePath: string) =>
              Boolean(resourcePath.includes(".module.")),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "postcss-loader",
      "sass-loader",
    ],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
    exclude: [
      /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    ],
  };

  const babelLoader = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          ["@babel/preset-env", "@babel/preset-react", { targets: "defaults" }],
        ],
        plugins: [isDev && require.resolve("react-refresh/babel")].filter(
          Boolean
        ),
      },
    },
  };

  return [
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: ["raw-loader"],
    },
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
      use: [
        {
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag",
            attributes: {
              "data-cke": true,
            },
          },
        },
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        },
      ],
    },
    fileLoader,
    typescriptLoader,
    babelLoader,
    styleLoader,
  ];
}
