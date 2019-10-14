class App {
    constructor(tag) {
        this.tag = tag;
    }
    screen(id) { return this.tag.screen(id); }
}

let app;

(() => {
    let tags = riot.mount('app')
    app = new App(tags[0]);
})();