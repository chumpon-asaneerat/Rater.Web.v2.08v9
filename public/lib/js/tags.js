riot.tag2('app', '<p>this is generate by riot v3.x. id: \'{opts.id}\', text: \'{opts.text}\'</p> <p>loca data: {lang.id} and {lang.text} </p> <button ref="change-button">Change</button> <button ref="call-button">Callme</button> <yield></yield>', 'app,[data-is="app"]{ margin: 0 auto; }', '', function(opts) {
        let self = this;
        self.lang = { id: 'EN', text: 'English' };

        console.log('opts:', this.opts)
        console.log('refs:', this.refs)
        console.log('tags:', this.tags)

        let change = (e) => {

            if (self.lang.id === 'EN') {
                self.lang = { id: 'TH', text: 'ไทย' }
            }
            else {
                self.lang = { id: 'EN', text: 'English' }
            }

            self.update();
        }

        let cnt = 0;

        let callMe = (e) => {
            let footer = self.tags['page-footer'];
            footer.callme('test' + cnt++);
        }

        let changeButton = null;
        let callButton = null;

        let bindEvents = () => {
            changeButton = self.refs["change-button"];
            callButton = self.refs["call-button"];

            changeButton.addEventListener('click', change)
            callButton.addEventListener('click', callMe)
        }
        let unbindEvents = () => {
            changeButton = self.refs["change-button"];
            callButton = self.refs["call-button"];

            changeButton.removeEventListener('click', change)
            callButton.removeEventListener('click', callMe)

            callButton = null;
            changeButton = null;
        }

        this.on('mount', () => {
            bindEvents();

            console.log('Screens:', this.tags['screen'])
        });
        this.on('unmount', () => {
            unbindEvents();
        });
});

riot.tag2('nav-bar', '<p>logo</p> <yield></yield>', 'nav-bar,[data-is="nav-bar"]{ display: block; background: cornflowerblue; color: whitesmoke; } nav-bar p,[data-is="nav-bar"] p{ display: inline; padding: 2px; }', '', function(opts) {
});
riot.tag2('page-footer', '<p>footer</p> <p ref="l1"></p>', '', '', function(opts) {
        let self = this;

        this.callme = (message) => {
            let el = self.refs['l1'];
            el.textContent = message;
            console.log('page-footer callme is reveived messagfe :', '"' + message + '"')
        }

        this.on('mount', () => {
            console.log('root:', this.root)
        });
        this.on('unmount', () => {
        });
});
riot.tag2('screen', '<yield></yield>', '', '', function(opts) {
});