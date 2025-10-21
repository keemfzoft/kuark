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
export function spawn(name, testAuto = true) {
    return new Curator(name, testAuto);
}

class Curator {
    constructor(name, testAuto = true) {
        const e = this;
        
        this.worker = new Worker(name, { type: "module" });

        this.worker.onmessage = (ev) => {
            e.render(ev);
        }

        if (testAuto) {
            //this.worker.postMessage("test");
            this.paint();
        }
    }

    render(ev) {
        const el = document.getElementById(ev.data.target);

        render(ev.data.glyph, el);
    }

    paint(glyph) {
        if (glyph) {
            this.worker.postMessage({
                action: "paint",
                glyph,
            });
        } else {
            this.worker.postMessage("paint");
        }
    }
}