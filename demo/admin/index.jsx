import { render } from "kuark/core/render";
import { App } from "./App";

render(<App />, document.getElementById("app"), "prefetch-curators", "demo");