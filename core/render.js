import { spawn } from "./index";

const XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
const curators = [];

export function render(glyph, parent, option, mode = "test") {
    if (option == "prefetch-curators") {
        console.log(mode);
        prefetch(glyph, mode);
        render(glyph, parent, "paint");

        console.log(curators);

        return;
    }

    console.log(glyph);

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

        if (glyph.props.hint) {
            const hintDom = document.createElementNS(XHTML_NAMESPACE, "span");
            const hintText = document.createTextNode(glyph.props.hint);

            hintDom.appendChild(hintText);
            hintDom.id = "test-reader-hint";
            hintDom.className = "visually-hidden";

            dom.setAttribute("aria-describedby", "test-reader-hint");
            parent.appendChild(hintDom);
        }

        if (glyph.props.curator) {
            if (glyph.props.glyph) {
                dom.id = glyph.props.glyph;
            } else {
                dom.id = glyph.props.curator;
            }

            if (option === "paint") {
                console.log("paint");
                for (const curator of curators) {
                    if (curator.name == glyph.props.curator) {
                        console.log(curator);

                        if (glyph.props.glyph) {
                            console.log("paint glyph");
                            curator.instance.paint(glyph.props.glyph);
                        } else {
                            console.log("paint default");
                            curator.instance.paint();
                        }
                        
                        break;
                    }
                }
            } else {
                console.log('spawn');
                spawn("../dist/assets/" + glyph.props.curator + ".js");
            }
        }
    } else if (typeof glyph === "string") {
        dom = document.createTextNode(glyph);
    } else if (typeof glyph.type === "function") {
        render(glyph.type(glyph.props), parent, option);
    }

    if (dom) {
        if (typeof glyph === "object" && glyph.props.children) {
            let children = glyph.props.children;

            if (!Array.isArray(children)) {
                children = [children];
            }

            if (Array.isArray(children)) {
                for (let child of children) {
                    render(child, dom, option);
                    parent.appendChild(dom);
                }
            }
        } else {
            parent.appendChild(dom);
        }
    }

    return dom;
}

function prefetch(glyph, mode = "test") {
    if (glyph.class === "kuark.glyph" && typeof glyph.type === "string") {
        if (glyph.props.curator) {
            if (!curators.some(item => item.name == glyph.props.curator)) {
                let curator = null;
                
                if (mode == "demo") {
                    curator = spawn("../dist/assets/" + glyph.props.curator + "-curator.js", false);
                } else {
                    curator = spawn("../dist/assets/" + glyph.props.curator + ".js", false);
                }

                curators.push({
                    name: glyph.props.curator,
                    instance: curator,
                });
            }
        }
    } else if (typeof glyph === "string") {
        
    } else {
        prefetch(glyph.type(glyph.props), mode);
    }

    if (typeof glyph === "object" && glyph.props.children) {
        let children = glyph.props.children;

        if (!Array.isArray(children)) {
            children = [children];
        }

        if (Array.isArray(children)) {
            for (let child of children) {
                prefetch(child, mode);
            }
        }
    }
}