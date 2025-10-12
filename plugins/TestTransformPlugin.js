export default function TestTransformPlugin() {
    return {
        name: 'custom-transform-plugin',
        enforce: 'pre', // or 'post' depending on timing
        transform(code, id) {
            if (id.endsWith('.glyph') || id.includes('sample.glyph')) {
                const transformed = code.replace(/console\.log/g, 'customLogger');

                return {
                    code: transformed,
                    map: null // or generate source map
                };
            }
        }
    };
}