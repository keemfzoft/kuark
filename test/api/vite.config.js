import { defineConfig, loadEnv } from "vite";
import path from "path";
import { Kuark } from "./kits/kuark/plugins/vite";

async function getConfig() {
    return defineConfig(async ({ mode }) => {
        return {
            resolve: {
                extensions: ["*", ".js", ".jsx", ".json"],
                alias: {
                    kuark: path.resolve(__dirname, "kits/kuark"),
                    app: path.resolve(__dirname, "app"),
                },
            },
            build: {
                rollupOptions: {
                    input: {
                        main: "app/index.jsx",
                    },
                    output: {
                        entryFileNames: 'assets/[name].js',
                        chunkFileNames: 'assets/[name].js',
                        assetFileNames: 'assets/[name].[ext]'
                    },
                },
                minify: true,
            },
            plugins: [
                Kuark(),
            ],
            esbuild: {
                jsx: "automatic",
                jsxImportSource: "kuark/core",
            },
        };
    });
};

export default getConfig();