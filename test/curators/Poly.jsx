export function Glyph1() {
    return (
        <div aesthetic="prism">
            <h1>Glyph 1</h1>
            <small>This is a test glyph 1</small>
        </div>
    );
}

export function Glyph2() {
    return (
        <div aesthetic="prism">
            <h1>Glyph 2</h1>
            <small>This is a test glyph 2</small>
        </div>
    );
}

export function Glyph3() {
    return (
        <div aesthetic="prism">
            <h1>Glyph 3</h1>
            <small hint="Test accessibility">This is a test glyph 3</small>
        </div>
    );
}

/*const glyphs = [
    { name: "glyph1", component: Glyph1 },
    { name: "glyph2", component: Glyph2 },
    { name: "glyph3", component: Glyph3 },
];*/

self.onmessage = (ev) => {
    if (typeof ev.data === "object") {
        if (ev.data.action == "paint") {
            for (let glyph of glyphs) {
                if (glyph.name == ev.data.glyph) {
                    self.postMessage({
                        target: ev.data.glyph,
                        glyph: glyph.component(),
                    });
                    
                    break;
                }
            }
        }
    } else {
        self.postMessage({
            target: "test",
            glyph: {},
        });
    }
}