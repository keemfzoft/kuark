export default {
    plugins: [
        {
            postcssPlugin: 'my-transformer',
            Once(root) {
                //console.log(root);

                root.walkRules(rule => {
                    // Example: prefix all selectors
                    //rule.selectors = rule.selectors.map(sel => `.my-prefix ${sel}`);
                });
            },
        },
    ]
};