import { spawn } from "./index";

export const XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";

export function render(glyph, parent) {
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

            spawn("../dist/assets/" + glyph.props.curator + ".js");
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
                render(child, dom);
                parent.appendChild(dom);
            }
        } else {
            parent.appendChild(dom);
        }
    }

    return dom;
}