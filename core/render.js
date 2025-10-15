import { spawn } from "./index";

const XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
const curators = new Set();

export function render(glyph, parent, option) {
    if (option == "prefetch-curators") {
        prefetch(glyph);
        render(glyph, parent, "paint");

        return;
    }

    let dom = null;

    if (glyph.class === "kuark.glyph" && typeof glyph.type === "string") {
        dom = document.createElementNS(XHTML_NAMESPACE, glyph.type);

        if (glyph.props.className) {
            dom.className = glyph.props.className;
        }

        if (glyph.props.layout) {
            dom.className = `${dom.className} ${glyph.props.layout}`;
        }

        if (glyph.props.aesthetic) {
            dom.className = `${dom.className} ${glyph.props.aesthetic}`;
        }

        if (glyph.props.curator) {
            dom.id = glyph.props.curator;

            if (option === "paint") {
                for (const curator of curators) {
                    if (curator.name == glyph.props.curator) {
                        console.log(curator);
                        curator.instance.paint();
                        break;
                    }
                }
            } else {
                spawn("../dist/assets/" + glyph.props.curator + ".js");
            }
        }
    } else if (typeof glyph === "string") {
        dom = document.createTextNode(glyph);
    }

    if (dom) {
        if (typeof glyph === "object" && glyph.props.children) {
            let children = glyph.props.children;

            if (typeof children === "string") {
                children = [children];
            }

            for (let child of children) {
                render(child, dom, option);
                parent.appendChild(dom);
            }
        } else {
            parent.appendChild(dom);
        }
    }

    return dom;
}

function prefetch(glyph) {
    if (glyph.class === "kuark.glyph" && typeof glyph.type === "string") {
        if (glyph.props.curator) {
            if (!curators.has(glyph.props.curator)) {
                const curator = spawn("../dist/assets/" + glyph.props.curator + ".js", false);

                curators.add({
                    name: glyph.props.curator,
                    instance: curator,
                });
            }
        }
    }

    if (typeof glyph === "object" && glyph.props.children) {
        let children = glyph.props.children;

        if (typeof children === "string") {
            children = [children];
        }

        for (let child of children) {
            prefetch(child);
        }
    }
}