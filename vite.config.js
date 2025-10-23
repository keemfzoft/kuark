import { defineConfig, loadEnv } from "vite";
import path from "path";
import TestPlugin from "./plugins/TestPlugin";
import TestTransformPlugin from "./plugins/TestTransformPlugin";
import TestAggregatePlugin from "./plugins/TestAggregatePlugin";
import { Kuark } from "./plugins/vite";

async function getConfig() {
    return defineConfig(async ({ mode }) => {
        const env = loadEnv(mode, process.cwd());

        return {
            resolve: {
                extensions: ["*", ".js", ".jsx", ".json"],
                alias: {
                    kuark: path.resolve(__dirname, ""),
                    app: path.resolve(__dirname, "demo"),
                },
            },
            build: {
                rollupOptions: {
                    input: {
                        index: "test/index.js",
                        test: "test/index.jsx",
                        component: "test/component.jsx",
                        glyph: "test/sample.glyph",
                        prefetch: "test/prefetch.js",
                        main: "demo/index.jsx",
                        admin: "demo/admin/index.jsx",
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
                //TestTransformPlugin(),
                //TestPlugin(),
                //TestAggregatePlugin(),
            ],
            esbuild: {
                jsx: "automatic",
                jsxImportSource: "kuark/core",
            },
        };
    });
};

export default getConfig();