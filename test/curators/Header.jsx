function Header() {
    return (
        <div>
            <h1>Header</h1>
            <small>This is a header</small>
            <div>
                <h3>Test Internal Curator</h3>
                <div>
                    <p curator="test"></p>
                </div>
            </div>
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