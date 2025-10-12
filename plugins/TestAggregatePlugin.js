import fs from 'fs'
import path from 'path'

export default function TestAggregatePlugin() {
    const aesthetics = [];
    const layouts = [];

    return {
        name: 'aggregate-css',
        enforce: 'pre',
        transform(code, id) {
            if (id.endsWith('.jsx')) {
                const pattern = /aesthetic="(.+?)"/g;
                const pattern2 = /layout="(.+?)"/g;

                for (const match of code.matchAll(pattern)) {
                    console.log("test");
                    console.log(match[1]);
                    aesthetics.push(match[1]);
                }

                for (const match of code.matchAll(pattern2)) {
                    layouts.push(match[1]);
                }
            }
        },
        generateBundle(_, bundle) {
            let aggregated = '';

            const targetDir = path.resolve(path.join(process.cwd(), "test"), 'aesthetics')
            const files = fs.readdirSync(targetDir)

            for (const aesthetic of aesthetics) {
                const file = path.resolve(process.cwd(), `test/aesthetics/${aesthetic}.css`);

                //console.log(file);

                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");
                    console.log(content);
                    aggregated += '\n' + content + '\n';
                }
            }

            for (const layout of layouts) {
                const file = path.resolve(process.cwd(), `test/layouts/${layout}.css`);

                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, "utf-8");

                    aggregated += '\n' + content + '\n';
                }
            }

            /*for (const file of files) {
                console.log(file);
                const fullPath = path.join(targetDir, file)
                const content = fs.readFileSync(fullPath, 'utf-8')
                //console.log(`📄 ${file}:\n${content.slice(0, 100)}...`)
                console.log(content);
            }*/

            for (const fileName in bundle) {
                if (fileName.endsWith('.css')) {
                    aggregated += bundle[fileName].source + '\n';
                    delete bundle[fileName]; // optional: remove originals
                }
            }
            
            bundle['styles.css'] = {
                type: 'asset',
                fileName: 'styles.css',
                source: aggregated
            };
        }
    }
}