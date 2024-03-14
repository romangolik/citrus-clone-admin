import path from "path";

import {BuildEnv, BuildPaths} from "./config/build/types/config";
import {buildWebpackConfig} from "./config/build/buildWebpackConfig"; 

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const isDev = mode === 'development'

    const port = env.port || 3000;

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        htmlTemplate: path.resolve(__dirname, 'public', 'index.html')
    };

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port
    })
};
