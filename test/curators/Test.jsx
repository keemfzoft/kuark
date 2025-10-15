function Test() {
    return (
        <div>
            <h1>Internal Curator</h1>
            <small>This is a test internal curator</small>
        </div>
    );
}

const glyph = Test();

self.onmessage = (ev) => {
    self.postMessage({
        target: "test",
        glyph,
    });
}