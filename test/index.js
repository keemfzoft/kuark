import { render } from "../core/render";
import { App } from "./App";

const glyph = App();

console.log(glyph);

render(glyph, document.getElementById("app"));