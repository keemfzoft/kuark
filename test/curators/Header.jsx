function Header() {
    return (
        <div>
            <h1>Header</h1>
            <small>This is a header</small>
            <p curator="test"></p>
        </div>
    );
}

const glyph = Header();

self.onmessage = (ev) => {
    self.postMessage({
        target: "header",
        glyph,
    });
}