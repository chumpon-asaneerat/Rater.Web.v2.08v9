riot.tag2('app', '<nav-bar class="navibar"></nav-bar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'scrarea\'; overflow: hidden; } app[navbar][footer],[data-is="app"][navbar][footer]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'nav-bar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navbar],[data-is="app"][navbar]{ grid-template-columns: 1fr; grid-template-rows: 1fr 20px; grid-template-areas: \'nav-bar\' \'fooscrareater\'; overflow: hidden; } app[footer],[data-is="app"][footer]{ grid-template-columns: 1fr; grid-template-rows: 1fr 20px; grid-template-areas: \'scrarea\' \'footer\'; overflow: hidden; } app .nav-bar,[data-is="app"] .nav-bar{ grid-area: nav-bar; overflow: hidden; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 0 2px; overflow: hidden; }', '', function(opts) {


        let self = this;
        this.screens = [];

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {

            scanScreens();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();

            resetScreens();
        });

        let scanScreens = () => {
            let sobjs = self.tags['screen'];
            if (sobjs) {
                if (!Array.isArray(sobjs)) self.screens.push(sobjs)
                else self.screens.push(...sobjs)
            }
            setAppToScreens();
            setDefaultScreen();
        }
        let setAppToScreens = () => {
            self.screens.forEach((screen) => { screen.setapp(self); })
        }
        let setDefaultScreen = () => {
            if (self.screens && self.screens[0]) self.screens[0].show();
        }
        let resetScreens = () => { self.screens = []; }

        this.screen = (id) => {
            let ret = null;
            if (id >= 0 && id < self.screens.length) {
                ret = self.screens[id];
            }
            return ret;
        }

});

riot.tag2('language-menu', '<div> <a class="flag" href="#"> <span class="flag-css flag-icon flag-icon-{flagcode}" ref="css-icon"></span> &nbsp; <div class="flag-text">EN</div> &nbsp; <span class="drop-synbol fas fa-caret-down"></span> </a> </div>', 'language-menu,[data-is="language-menu"]{ margin: 0 auto; padding: 0, 2px; display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr; grid-template-areas: \'flag\'; align-items: center; justify-content: stretch; } language-menu a,[data-is="language-menu"] a{ margin: 0 auto; color: whitesmoke; } language-menu a:link,[data-is="language-menu"] a:link,language-menu a:visited,[data-is="language-menu"] a:visited{ text-decoration: none; } language-menu a:hover,[data-is="language-menu"] a:hover,language-menu a:active,[data-is="language-menu"] a:active{ color: yellow; text-decoration: none; } language-menu .flag,[data-is="language-menu"] .flag{ margin: 0 auto; } language-menu .flag-css,[data-is="language-menu"] .flag-css{ margin: 0px auto; padding-top: 1px; display: inline-block; } language-menu .flag-text,[data-is="language-menu"] .flag-text{ margin: 0 auto; display: inline-block; } language-menu .drop-symbol,[data-is="language-menu"] .drop-symbol{ margin: 0 auto; display: inline-block; }', '', function(opts) {


        let self = this;
        this.flagcode = 'us'

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

});
riot.tag2('links-menu', '<a ref="burger" href="#" class="toggle show"> <span ref="showlinks" class="burger fas fa-bars"></span> </a> <a ref="close" href="#" class="toggle"> <span ref="hidelinks" class="burger fas fa-times"></span> </a> <yield></yield>', 'links-menu,[data-is="links-menu"]{ margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } links-menu.dropdown,[data-is="links-menu"].dropdown{ margin: 0 auto; } links-menu .toggle,[data-is="links-menu"] .toggle{ display: none; } links-menu .toggle.show,[data-is="links-menu"] .toggle.show{ display: inline-block; }', '', function(opts) {


        let self = this;

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

});

riot.tag2('nav-bar', '<div class="banner"> <div>app</div> </div> <language-menu></language-menu> <links-menu></links-menu>', 'nav-bar,[data-is="nav-bar"]{ width: 100vw; margin: 0 auto; padding: 0; display: grid; grid-template-columns: 1fr 90px 50px; grid-template-rows: 1fr; grid-template-areas: \'banner lang-menu links-menu\'; background: cornflowerblue; color: whitesmoke; } nav-bar .banner,[data-is="nav-bar"] .banner{ grid-area: banner; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar language-menu,[data-is="nav-bar"] language-menu{ grid-area: lang-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar links-menu,[data-is="nav-bar"] links-menu{ grid-area: links-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; }', '', function(opts) {


        let self = this;

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

});
riot.tag2('page-footer', '<p class="caption">Status:</p> <p class="status" ref="l1"></p> <p class="copyright">&copy; EDL Co., Ltd. 2019</p>', 'page-footer,[data-is="page-footer"]{ width: 100vw; display: grid; grid-template-columns: 30px 1fr 120px; grid-template-rows: 1fr; grid-template-areas: \'caption status copyright\'; justify-items: stretch; align-items: stretch; font-size: 0.75em; font-weight: bold; background: darkorange; color: whitesmoke; } page-footer .caption,[data-is="page-footer"] .caption{ grid-area: caption; padding-left: 3px; } page-footer .status,[data-is="page-footer"] .status{ grid-area: status; } page-footer .copyright,[data-is="page-footer"] .copyright{ grid-area: copyright; }', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

});
    
riot.tag2('screen', '<yield></yield> </script>', 'screen,[data-is="screen"]{ margin: 0 auto; padding: 0; display: none; } screen.show,[data-is="screen"].show{ display: block; }', '', function(opts) {


        let self = this;
        this.app = null;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

        let hideOtherScreens = () => {
            let screens = self.app.screens;
            screens.forEach(screen => { if (screen !== self) screen.hide(); })
        }

        this.hide = () => {
            self.root.classList.remove('show')
            self.update();
        }

        this.show = () => {
            hideOtherScreens();
            self.root.classList.add('show')
            self.update();
        }

        this.setapp = (app) => {
            if (!app) return self.app;
            self.app = app;
        }

});