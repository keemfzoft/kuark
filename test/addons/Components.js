class MyElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = "<h1>Hello Kuark!</h1>";
    }
}

customElements.define("my-element", MyElement);