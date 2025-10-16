export function Header() {
    return (
        <div>
            <h1>Header</h1>
            <small>This is a header</small>
        </div>
    );
}

self.onmessage = (ev) => {
    console.log(ev);
    
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
    }
}