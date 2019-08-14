riot.tag2('app', '<p>this is generate by riot v3.x. id: \'{opts.id}\', text: \'{opts.text}\'</p> <p>loca data: {lang.id} and {lang.text} </p> <button ref="change-button">Change</button> <button ref="call-button">Callme</button> <yield></yield>', 'app,[data-is="app"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

        this.publicMethod = (message) => { }

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
riot.tag2('screen', '<yield></yield>', 'screen,[data-is="screen"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

});