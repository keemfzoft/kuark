function createGlyph(type, props, key) {
  return {
    class: "kuark.glyph",//Symbol.for("kuark.glyph"),
    type,
    props,
    key
  };
}
function jsx(type, props, key) {
  return createGlyph(type, props, key);
}
function jsxs(type, props, key) {
  return createGlyph(type, props, key);
}
//const Fragment = Symbol.for("kuark.fragment");
function Component() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Component" }),
    /* @__PURE__ */ jsx("small", { children: "Test Component" })
  ] });
}

self.onmessage = function (event) {
    const result = Component(); //heavyComputation(event.data);

    self.postMessage(result);
};

function heavyComputation(input) {
    // Simulate CPU work
    let total = 0;
    for (let i = 0; i < 1e7; i++) {
        total += input * Math.random();
    }

    return total;
}