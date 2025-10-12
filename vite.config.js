import { defineConfig, loadEnv } from "vite";
import path from "path";
import TestPlugin from "./plugins/TestPlugin";
import TestTransformPlugin from "./plugins/TestTransformPlugin";
import TestAggregatePlugin from "./plugins/TestAggregatePlugin";

async function getConfig() {
    return defineConfig(async ({ mode }) => {
        const env = loadEnv(mode, process.cwd());

        return {
            resolve: {
                extensions: ["*", ".js", ".jsx", ".json"],
                alias: {
                    kuark: path.resolve(__dirname, "core")
                },
            },
            build: {
                rollupOptions: {
                    input: {
                        index: "test/index.js",
                        main: "test/index.jsx",
                        component: "test/component.jsx",
                        glyph: "test/sample.glyph",
                    },
                    output: {
                        entryFileNames: 'assets/[name].js',
                        chunkFileNames: 'assets/[name].js',
                        assetFileNames: 'assets/[name].[ext]'
                    },
                    onwarn(warning, warn) {
                        // Ignore "use client" warnings
                        if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) {
                            return;
                        }

                        // Use default for everything else
                        warn(warning);
                    },
                },
                minify: false,
            },
            plugins: [
                TestTransformPlugin(),
                TestPlugin(),
                TestAggregatePlugin(),
            ],
            esbuild: {
                jsx: "automatic",
                jsxImportSource: "kuark",
            },
        };
    });
};

export default getConfig();