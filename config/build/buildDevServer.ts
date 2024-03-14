import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import { BuildOptions } from "./types/config"; 

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const { port } = options;

  return {
    port,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: [
      {
        path: "/api",
        target: "http://localhost:8000/api/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    ],
  };
}
