import { render } from "../core/render.js";
import "./sample.css";
import "./sample2.css";

class State {
    constructor() {
        this.test = true;
    }
}

class Glyph {
    constructor() {

    }
}

class LiveGlyph {
    constructor() {

    }
}

export function TestComponent() {
    return (
        <>
            <div>Test Component</div>
            <p>This is a test component</p>
        </>
    );
};

export function Glyphs(props) {
    return (
        <>
            {props.children}
        </>
    )
}

export function TestGlyph() {
    const data = { sample: "sample" };
    const state = new State();
    const compute = (state, fn) => {
        const value = fn(state);

        return new Glyph(value);
    }
    const glyph = new LiveGlyph(state);

    return (
        <div>
            <h1>Test Glyph</h1>
            <small>Sample Glyph</small>
            <div>{state.test ? "Test": "Live"}</div>
            <div>
                <div>Subchild</div>
                <small>Test</small>
            </div>
            {state.test ? (
                <div>Test</div>
            ) : (
                <div>Live</div>
            )}
            <Glyphs>
                <div>Glyph1</div>
                <small>Glyph2</small>
            </Glyphs>
        </div>
    );
}

function Test() {
    console.log("Test");
    
    return <TestGlyph />

    return (
        <>
            <TestComponent />
            <TestGlyph />
        </>
    );
}

const glyph = Test();

console.log(glyph);

const e = glyph.type();

console.log(e)

render(e, document.body);