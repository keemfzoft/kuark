import { render } from "kuark/render";
import { App } from "demo/admin/App";

render(<App />, document.getElementById("app"), "prefetch-curators", "demo");