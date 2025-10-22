import fs from "fs";
import path from "path";
import { loadEnv } from "vite"
import { Helper } from "./helper";

export function Kuark() {
    let env = null;
    let serving = false;
    let virtualLayouts = "";
    let virtualAesthetics = "";

    return {
        name: "kuark-vite-plugin",
        config(config, { mode }) {
            env = loadEnv(mode, process.cwd())
        },
        configResolved(config) {
            const isDev = config.command === "serve";

            serving = isDev;
        },
        buildStart(options) {
            const rootDir = path.resolve(path.join(process.cwd(), env.VITE_APP_BASE));
            const files = listFilesRecursively(rootDir);
            let curators = [];
            let aesthetics = [];
            let layouts = [];
            let skins = [];
            let motions = [];

            for (let key in files) {
                const file = path.resolve(rootDir, files[key]);
                
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");

                    curators = curators.concat(Helper.extract("curators", content));
                    aesthetics = aesthetics.concat(Helper.extract("aesthetics", content));
                    layouts = layouts.concat(Helper.extract("layouts", content));
                    skins = skins.concat(Helper.extract("skins", content));
                    motions = motions.concat(Helper.extract("motions", content));
                }
            }

            for (let curator of curators) {
                const name = capitalize(curator);

                if (serving) {
                    options.input[`${curator}`] = path.join(process.cwd(), `${env.VITE_APP_BASE}/curators/${name}.jsx`);
                } else {
                    options.input[`${curator}-curator`] = path.join(process.cwd(), `${env.VITE_APP_BASE}/curators/${name}.jsx`);
                }
            }

            let source = "";

            for (let aesthetic of aesthetics) {
                const file = path.join(rootDir, `aesthetics/${aesthetic}.css`);

                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, "utf-8");

                    const pattern = /(\..+?)\s*{/g;
                    const patched = [];

                    for (const match of content.matchAll(pattern)) {
                        const selector = match[1];
                        const pattern2 = new RegExp(`${selector}`, "g");

                        if (!patched.includes(selector)) {
                            content = content.replace(pattern2, `${selector}-aesthetic`);    
                            patched.push(selector);
                        }
                    }

                    source += content + '\n';
                }
            }

            for (let skin of skins) {
                const file = path.join(rootDir, `skins/${skin}.css`);

                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, "utf-8");

                    const pattern = /(\..+?)\s*{/g;

                    for (const match of content.matchAll(pattern)) {
                        const selector = match[1];
                        const pattern2 = new RegExp(selector, "g");

                        content = content.replace(pattern2, `${selector}-skin`);    
                    }

                    source += content + '\n';
                }
            }

            for (let motion of motions) {
                const file = path.join(rootDir, `motions/${motion}.css`);

                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, "utf-8");

                    const pattern = /(\..+?)\s*{/g;

                    for (const match of content.matchAll(pattern)) {
                        const selector = match[1];
                        const pattern2 = new RegExp(selector, "g");

                        content = content.replace(pattern2, `${selector}-motion`);    
                    }

                    source += content + '\n';
                }
            }

            virtualAesthetics = source;

            if (!serving) {
                this.emitFile({
                    type: "asset",
                    fileName: "assets/aesthetics.css",
                    source,
                });
            }

            source = "";

            for (let layout of layouts) {
                const file = path.join(rootDir, `layouts/${layout}.css`);

                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, "utf-8");
                    const pattern = /(\..+?)\s*{/g;

                    for (const match of content.matchAll(pattern)) {
                        const selector = match[1];
                        const pattern2 = new RegExp(selector, "g");

                        content = content.replace(pattern2, `${selector}-layout`);    
                    }

                    source += content + '\n';
                }
            }

            virtualLayouts = source;

            if (!serving) {
                this.emitFile({
                    type: "asset",
                    fileName: "assets/layouts.css",
                    source,
                });
            }
        },
        resolveId(id) {
            if (id.endsWith("/assets/main.js")) {
                return `${env.VITE_APP_BASE}/index.jsx`;
            }
        },
        load(id) {
            const pattern = /curator/g;
            const rootDir = path.resolve(path.join(process.cwd(), env.VITE_APP_BASE));

            if (id === `${env.VITE_APP_BASE}/index.jsx`) {
                const file = path.join(rootDir, `/index.jsx`);
                const code = fs.readFileSync(file, "utf-8");

                return {
                    code, 
                };
            }

            if (id.endsWith("/assets/aesthetics.css?direct")) {
                return {
                    code: virtualAesthetics,
                    meta: {
                        vite: {
                            lang: "css",
                        },
                    },
                };
            } else if (id.endsWith("/assets/layouts.css?direct")) {
                return {
                    code: virtualLayouts,
                    meta: {
                        vite: {
                            lang: "css",
                        },
                    },
                };
            }

            if (pattern.test(id)) {
                const file = id;
                
                if (fs.existsSync(file)) {
                    const glyphs = [];
                    let content = fs.readFileSync(file, "utf-8");
                    const pattern = /export function\s*(.*?)\(/g;

                    for (const match of content.matchAll(pattern)) {
                        const glyph = match[1];

                        if (!glyphs.includes(glyph)) {
                            glyphs.push(glyph);
                        }
                    }

                    content += '\n';

                    let list = "";

                    for (let glyph of glyphs) {
                        const name = glyph.toLowerCase();
                        
                        list += `{name: "${name}", component: ${glyph}},`;
                    }

                    content += `const glyphs = [${list}];\n`;
                    content += `self.onmessage = emit(glyphs)\n`;

                    return content;
                }
            }
        },
        transform(code, id) {
            const pattern = /curator/g;

            if (pattern.test(id)) {
                const transformed = `import { emit } from "kuark";\n${code}`;
                
                return {
                    code: transformed,
                    map: null // or generate source map
                };
            }
        },
        generateBundle(_, bundle) {
            
        },
        handleHotUpdate({ server, file }) {
            if (file.endsWith(".css")) {
                server.restart();
            }
        },
    };
}

function listFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
            results = results.concat(listFilesRecursively(fullPath));
        } else {
            results.push(fullPath);
        }
    });

    return results;
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);