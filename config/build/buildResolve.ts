import path from "path";
import webpack from "webpack";

export function buildResolve(): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@assets': path.resolve('./src/assets'),
            '@utils': path.resolve('./src/utils'),
            '@components': path.resolve('./src/components'),
            '@pages': path.resolve('./src/pages'),
            '@router': path.resolve('./src/router'),
            '@store': path.resolve('./src/store'),
            '@services': path.resolve('./src/services'),
            '@src': path.resolve('./src'),
        },
    }
}