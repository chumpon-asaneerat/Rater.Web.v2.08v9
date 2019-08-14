riot.tag2('app', '<p>this is generate by riot v3.x. id: \'{opts.id}\', text: \'{opts.text}\'</p> <p>loca data: {lang.id} and {lang.text} </p> <button ref="change-button">Change</button> <button ref="call-button">Callme</button> <button onclick="{show}" value="0">show1</button> <button onclick="{show}" value="1">show2</button> <button onclick="{show}" value="2">show3</button> <yield></yield>', 'app,[data-is="app"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        this.screens = [];

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            bindEvents();
            let sobjs = self.tags['screen'];
            if (sobjs) {
                if (!Array.isArray(sobjs)) self.screens.push(sobjs)
                else self.screens.push(...sobjs)
            }
            self.screens.forEach((screen) => { screen.app(self); })

            if (self.screens && self.screens[0]) self.screens[0].show();
        });
        this.on('unmount', () => {
            unbindEvents();
            self.screens = []
        });

        this.show = (e) => {

            let id = e.target.value;
            let screen = self.screen(id);
            if (screen) screen.show();
        }

        this.screen = (id) => {
            let ret = null;
            if (id >= 0 && id < self.screens.length) {
                ret = self.screens[id];
            }
            return ret;
        }

});

riot.tag2('nav-bar', '<p>logo</p> <yield></yield>', 'nav-bar,[data-is="nav-bar"]{ display: block; background: cornflowerblue; color: whitesmoke; } nav-bar p,[data-is="nav-bar"] p{ display: inline; padding: 2px; }', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

});

riot.tag2('page-footer', '<p>footer</p> <p ref="l1"></p>', '', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        this.callme = (message) => {
            let el = self.refs['l1'];
            el.textContent = message;
            console.log('page-footer callme is reveived messagfe :', '"' + message + '"')
        }

});
riot.tag2('screen', '<yield></yield>', 'screen,[data-is="screen"]{ margin: 0 auto; display: none; } screen[active=true],[data-is="screen"][active=true]{ display: block; }', 'active="{opts.active ? true : false}"', function(opts) {


        let self = this;
        this.opts.active = false;
        this.app = null;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => { unbindEvents(); });

        let hideOtherScreens = () => {
            let screens = self.app.screens;
            screens.forEach(screen => {
                if (screen !== self) screen.hide();
            })
        }

        this.hide = () => {
            self.opts.active = false;

            self.update();
        }

        this.show = () => {
            hideOtherScreens();
            self.opts.active = true;
            self.update();
        }

        this.app = (app) => {
            if (!app) return self.app;
            self.app = app;
        }

});