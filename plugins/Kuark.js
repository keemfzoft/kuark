import fs from "fs";
import path from "path";

export function Kuark() {
    //const aestheticsVirtualID = "virtual:kuark-aesthetics";
    //let aestheticsRef = null;

    return {
        name: "kuark-vite-plugin-test",
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

            for (let key in files) {
                const file = path.resolve(rootDir, files[key]);
                
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");
                    const pattern = /curator="(.+?)"/g;
                    const pattern2 = /aesthetic="(.+?)"/g;
                    const pattern3 = /layout="(.+?)"/g;

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
                }
            }

            console.log(curators);

            for (let curator of curators) {
                const name = capitalize(curator);
                console.log(curator);
                
                options.input[`${curator}-curator`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
            }

            let source = "";

            for (let aesthetic of aesthetics) {
                const file = path.join(rootDir, `aesthetics/${aesthetic}.css`);

                if (fs.existsSync(file)) {
                    let content = fs.readFileSync(file, "utf-8");

                    const pattern = /(\..+?)\s*{/g;

                    for (const match of content.matchAll(pattern)) {
                        const selector = match[1];
                        const pattern2 = new RegExp(selector, "g");

                        content = content.replace(pattern2, `${selector}-aesthetic`);    
                    }

                    source += content + '\n';
                }
            }

            

            /*aestheticsRef = this.emitFile({
                type: "asset",
                fileName: "assets/aesthetics.css",
                source,
            });*/

            this.emitFile({
                type: "asset",
                fileName: "assets/aesthetics.css",
                source,
            });

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

            this.emitFile({
                type: "asset",
                fileName: "assets/layouts.css",
                source,
            });
        },
        /*resolveId(id) {
            if (id === aestheticsVirtualID) {
                return `\\0${aestheticsVirtualID}`;
            }
        },*/
        load(id) {
            const pattern = /curator/g;

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
        }
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