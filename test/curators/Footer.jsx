function Footer() {
    return (
        <div>
            <h1>Footer</h1>
            <small>This is a footer</small>
        </div>
    );
}

const glyph = Footer();

self.onmessage = (ev) => {
    self.postMessage({
        target: "footer",
        glyph,
    });
}