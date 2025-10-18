import { defineConfig, loadEnv } from "vite";
import path from "path";
import TestPlugin from "./plugins/TestPlugin";
import TestTransformPlugin from "./plugins/TestTransformPlugin";
import TestAggregatePlugin from "./plugins/TestAggregatePlugin";
import { Kuark } from "./plugins/Kuark";

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
                        prefetch: "test/prefetch.js",
                        demo: "demo/index.jsx",
                        admin: "demo/admin/index.jsx",
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
                Kuark(),
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