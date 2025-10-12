import { render } from "../core/render.js";

export function Component() {
    return (
        <div className="sample" layout="simple" aesthetic="prism" skin="light" motion="pulse">
            <h1>Component</h1>
            <small aesthetic="prism-text">Test Component</small>
        </div>
    );
}

function Test() {
    return (
        <Component />
    );
}

const glyph = Test();

const e = glyph.type();

console.log(e);

console.log(glyph);
render(glyph.type(), document.body);