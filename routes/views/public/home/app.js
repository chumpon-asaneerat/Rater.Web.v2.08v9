class App {
    constructor(tag) {
        this.tag = tag;
    }
    screen(id) { return this.tag.screen(id); }
}

let app;

(() => {        
    //let tags = riot.mount('app', { text: 'my text' })
    let tags = riot.mount('app');
    //console.log(tags[0]);
    app = new App(tags[0]);
})();

let url = window.location.href.replace('#', '') + 'contents';
console.log('url:', url)
content.load(url); // load contents.
