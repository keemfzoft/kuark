function Content() {
    return (
        <div>
            <h1>Content</h1>
            <small>This is a content</small>
        </div>
    );
}

const glyph = Content();

self.onmessage = (ev) => {
    self.postMessage({
        target: "content",
        glyph,
    });
}