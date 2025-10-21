import fs from "fs";
import path from "path";

export function Kuark() {
    //const aestheticsVirtualID = "virtual:kuark-aesthetics";
    //let aestheticsRef = null;

    let serving = false;
    let virtualLayouts = "";
    let virtualAesthetics = "";

    return {
        name: "kuark-vite-plugin-test",
        /*configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/dist/assets/demo.js') {
                    res.setHeader('Content-Type', 'application/javascript');
                    res.end(`
                        import '/demo/index.jsx';
                        import '/virtual/aesthetics.css';
                    `);

                    return;
                } else if (req.url === "/dist/assets/admin.js") {
                    res.setHeader('Content-Type', 'application/javascript');
                    res.end(`
                        import '/demo/admin/index.jsx';
                        import '/virtual/aesthetics.css';
                    `);

                    return;
                }

                next();
            });
        },*/
        configResolved(config) {
            const isDev = config.command === "serve";

            if (isDev) {
                console.log("🟢 Kuark is running in dev mode");
            } else {
                console.log("🔵 Kuark is building for production");
            }

            serving = isDev;

        },
        buildStart(options) {
            const rootDir = path.resolve(path.join(process.cwd(), "demo"));
            const files = listFilesRecursively(rootDir);
            /*const filesx = fs.readdirSync(rootDir)
                .filter(file => file.endsWith('.jsx'))
                .reduce((inputs, file) => {
                    const name = path.basename(file, '.jsx');
                    
                    inputs[name] = `./${file}`;
                    
                    return inputs;
                }, {});*/

            const curators = [];
            const aesthetics = [];
            const layouts = [];
            const skins = [];

            for (let key in files) {
                const file = path.resolve(rootDir, files[key]);
                
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");
                    const pattern = /curator="(.+?)"/g;
                    const pattern2 = /aesthetic="(.+?)"/g;
                    const pattern3 = /layout="(.+?)"/g;
                    const pattern4 = /skin="(.+?)"|skin:\s*"(.+?)"/g;

                    for (const match of content.matchAll(pattern)) {
                        const curator = match[1];
                        
                        if (!curators.includes(curator)) {
                            curators.push(curator);
                        }
                    }

                    for (const match of content.matchAll(pattern2)) {
                        const aesthetic = match[1];

                        if (!aesthetics.includes(aesthetic)) {
                            aesthetics.push(aesthetic);
                        }
                    }

                    for (const match of content.matchAll(pattern3)) {
                        const layout = match[1];

                        if (!layouts.includes(layout)) {
                            layouts.push(layout);
                        }
                    }

                    for (const match of content.matchAll(pattern4)) {
                        const skin = match[2];
                        console.log(skin);

                        if (!skins.includes(skin)) {
                            skins.push(skin);
                        }
                    }
                }
            }

            console.log(curators);

            for (let curator of curators) {
                const name = capitalize(curator);
                console.log(curator);
                
                //options.input[`${curator}-curator`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
                //options.input[`${curator}`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
                
                if (serving) {
                    options.input[`${curator}`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
                } else {
                    options.input[`${curator}-curator`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
                }
            }

            let source = "";

            console.log(aesthetics);

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

            //source = "";

            console.log(skins);

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

            virtualAesthetics = source;

            /*aestheticsRef = this.emitFile({
                type: "asset",
                fileName: "assets/aesthetics.css",
                source,
            });*/

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

                    console.log(file);

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
            if (id.endsWith("/assets/demo.js")) {
                console.log("resolve");
                return "/demo/index.jsx";
            }

            if (id.endsWith("/assets/admin.js")) {
                return "/demo/admin/index.jsx";
            }

            if (id.endsWith("/assets/aesthetics.css?direct")) {
                //return "/virtual/aesthetics.css";
            }

            if (id.endsWith("/assets/layouts.css?direct")) {
                //return "/virtual/layouts.css";
            }
        },
        load(id) {
            const pattern = /curator/g;

            console.log(id);
            const rootDir = path.resolve(path.join(process.cwd(), "demo"));

            if (id === "/demo/index.jsx") {
                const file = path.join(rootDir, `/index.jsx`);
                const code = fs.readFileSync(file, "utf-8");

                return {
                    code, 
                };
            }

            if (id === "/demo/admin/index.jsx") {
                const file = path.join(rootDir, `/admin/index.jsx`);
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

                console.log("test");
                console.log(file);
                
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
                    /*content += `
                        // Test
                        self.onmessage = (ev) => {
                            if (typeof ev.data === "object") {
                                if (ev.data.action == "paint") {
                                    for (let glyph of glyphs) {
                                        if (glyph.name == ev.data.glyph) {
                                            self.postMessage({
                                                target: ev.data.glyph,
                                                glyph: resolve(glyph.component()),
                                            });
                                            
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    `;*/

                    /*content += `
                        // Test
                        function resolve(glyph) {
                            if (glyph.class === "kuark.glyph" && typeof glyph.type === "function") {
                                return resolve(glyph.type());
                            }

                            if (typeof glyph === "object" && glyph.props.children) {
                                let children = glyph.props.children;

                                if (!Array.isArray(children)) {
                                    //children = [children];
                                }

                                if (Array.isArray(children)) {
                                    for (let [index, child] of children.entries()) {
                                        glyph.props.children[index] = resolve(child);
                                    }
                                }
                            }

                            return glyph;
                        }
                    `;*/

                    return content;
                }
            }/* else if (id === `\\0${aestheticsVirtualID}`) {
                console.log("load " + aestheticsVirtualID);
                console.log(aestheticsRef);

                return `export default import.meta.ROLLUP_FILE_URL_${aestheticsRef};`;
            }*/

            //console.log(id);
        },
        transform(code, id) {
            const pattern = /curator/g;

            console.log(id);

            if (pattern.test(id)) {
                const transformed = `import { emit } from "../../core/render.js";\n${code}`;
                
                return {
                    code: transformed,
                    map: null // or generate source map
                };
            }
        },
        generateBundle(_, bundle) {
            console.log('Bundle contents:', Object.keys(bundle));
        },
        handleHotUpdate({ server, file }) {
            if (file.endsWith('.css')) {
                /*server.ws.send({
                    type: 'full-reload',
                    path: '*'
                });*/
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