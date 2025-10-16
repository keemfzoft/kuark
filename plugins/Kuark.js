import fs from "fs";
import path from "path";

export function Kuark() {
    return {
        name: "kuark-vite-plugin-test",
        buildStart(options) {
            const rootDir = path.resolve(path.join(process.cwd(), "demo"));
            const files = fs.readdirSync(rootDir)
                .filter(file => file.endsWith('.jsx'))
                .reduce((inputs, file) => {
                    const name = path.basename(file, '.jsx');
                    
                    inputs[name] = `./${file}`;
                    
                    return inputs;
                }, {});

            const curators = [];

            for (let key in files) {
                const file = path.resolve(rootDir, files[key]);
                
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");
                    const pattern = /curator="(.+?)"/g;
                    
                    for (const match of content.matchAll(pattern)) {
                        const curator = match[1];
                        
                        if (!curators.includes(curator)) {
                            curators.push(curator);
                        }
                    }
                }
            }

            console.log(curators);

            for (let curator of curators) {
                const name = capitalize(curator);
                
                options.input[`${curator}-curator`] = path.join(process.cwd(), `demo/curators/${name}.jsx`);
            }

            console.log(options.input);
        },
        /*resolveId(id) {
            console.log("resolveId");
            console.log(id);

            return id;
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

                    content += `const glyphs = [${list}];`;

                    return content;
                }
            }
        },
    };
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);