import { render } from "./render";

export function createApp(options) {
    console.log(options);
    
    const root = document.getElementById("app");

    
}

export function mount(options) {

}

export function deploy(name) {

}

/**
 * Function used to spawn curators (Web Workers that handle UI rendering)
 * 
 * @param string curator
 */
export function spawn(name) {
    return new Curator(name);
}

class Curator {
    constructor(name) {
        const e = this;
        const worker = new Worker(name, { type: "module" });

        worker.onmessage = (ev) => {
            e.render(ev);
        }

        worker.postMessage("test");
    }

    render(ev) {
        console.log(ev);
        const el = document.getElementById(ev.data.target);

        render(ev.data.glyph, el);
    }
}