export default function TestPlugin() {
    return {
        name: 'vite-plugin-list-compiled-files',
        buildStart(options) {
            console.log('Input files:', options.input);

            options.input.header = "test/curators/Header.jsx";
            options.input.content = "test/curators/Content.jsx";
            options.input.footer = "test/curators/Footer.jsx";
        },
        generateBundle(_, bundle) {
            const compiledFiles = Object.keys(bundle);
            console.log('Compiled files:', compiledFiles);
        },
    };
}