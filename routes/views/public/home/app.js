class App {
    constructor(tag) {
        this.tag = tag;
    }
    screen(id) { return this.tag.screen(id); }
}

let app;

(() => {
    let tags = riot.mount('app', { text: 'my text' })
    console.log(tags[0]);
    app = new App(tags[0]);
})();