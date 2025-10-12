//import { j as jsxx, a as jsxsx } from "../dist/assets/render-JAtvSSQc.js";

function createGlyph(type, props, key) {
  return {
    class: "kuark.glyph", //Symbol.for("kuark.glyph"),
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

const styleFragments = {
  card: `
    .card {
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      padding: 1rem;
    }
  `,
  glow: `
    .glow:hover {
      box-shadow: 0 0 12px rgba(0,255,255,0.6);
    }
  `,
  prism: `
    .prism {
      background: linear-gradient(45deg, #f0f, #0ff);
    }
  `,
};



function Component() {
  return /* @__PURE__ */ jsxs("div", { className: "prism", children: [
    /* @__PURE__ */ jsx("h1", { children: "Component" }),
    /* @__PURE__ */ jsx("small", { children: "Test Component" })
  ] });
}

self.onmessage = function (event) {
    const result = Component(); //heavyComputation(event.data);

    self.postMessage({
      parent: event.data,
      glyph: result,
      css: styleFragments.prism,
    });
};

self.onerror = function (error) {
  console.log(error);
}

function heavyComputation(input) {
    // Simulate CPU work
    let total = 0;
    for (let i = 0; i < 1e7; i++) {
        total += input * Math.random();
    }

    return total;
}