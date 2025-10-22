function extract(pattern, content) {
    const matches = [];

    for (const match of content.matchAll(pattern)) {
        const name = match[1];

        if (!matches.includes(name)) {
            matches.push(name);
        }
    }

    return matches;
}

function extractCurators(content) {
    return extract(/curator="(.+?)"/g, content);
}

function extractAesthetics(content) {
    return extract(/aesthetic="(.+?)"/g, content);
}

function extractLayouts(content) {
    return extract(/layout="(.+?)"/g, content);
}

function extractSkins(content) {
    return extract(/skin="(.+?)"|skin:\s*"(.+?)"/g, content);
}

function extractMotions(content) {
    return extract(/motion="(.+?)"/g, content);
}

export const Helper = {
    extract(type, content) {
        switch (type) {
            case "curators":
                return extractCurators(content);
            case "aesthetics":
                return extractAesthetics(content);
            case "layouts":
                return extractLayouts(content);
            case "skins":
                return extractSkins(content);
            case "motions":
                return extractMotions(content);
        }
    },
}