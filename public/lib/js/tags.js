riot.tag2('app', '<nav-bar class="navibar"></nav-bar> <sidebar class="sidebar"></sidebar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 200px 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'navibar navibar\' \'sidebar scrarea\' \'footer footer\'; overflow: hidden; } app .navibar,[data-is="app"] .navibar{ grid-area: navibar; } app .sidebar,[data-is="app"] .sidebar{ grid-area: sidebar; overflow: auto; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 0 2px; }', '', function(opts) {


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

        this.screen = (id) => {
            let ret = null;
            if (id >= 0 && id < self.screens.length) {
                ret = self.screens[id];
            }
            return ret;
        }

});

riot.tag2('nav-bar', '<div class="scrmenu">MAIN</div> <div class="banner"> <div>app name</div> </div> <div class="langmenu">EN</div> <div class="navmenu"> <a href="#"> <span ref="showlinks" class="burger fas fa-bars" active="true"></span> </a> <a href="#"> <span ref="hidelinks" class="burger fas fa-times"></span> </a> </div> <yield></yield>', 'nav-bar,[data-is="nav-bar"]{ width: 100vw; margin: 0 auto; padding: 0; display: grid; grid-template-columns: 25px 1fr 50px 30px; grid-template-rows: 1fr; grid-template-areas: \'scrmenu banner langmenu navmenu\'; background: cornflowerblue; color: whitesmoke; } nav-bar p,[data-is="nav-bar"] p{ display: inline; padding: 2px; } nav-bar .scrmenu,[data-is="nav-bar"] .scrmenu{ grid-area: scrmenu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .banner,[data-is="nav-bar"] .banner{ grid-area: banner; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .langmenu,[data-is="nav-bar"] .langmenu{ grid-area: langmenu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .navmenu,[data-is="nav-bar"] .navmenu{ grid-area: navmenu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .navmenu a,[data-is="nav-bar"] .navmenu a{ color: whitesmoke; } nav-bar .navmenu a:hover,[data-is="nav-bar"] .navmenu a:hover{ color: yellow; } nav-bar .navmenu span.burger,[data-is="nav-bar"] .navmenu span.burger{ display: none; } nav-bar .navmenu span[active=\'true\'].burger,[data-is="nav-bar"] .navmenu span[active=\'true\'].burger{ display: inline-block; }', '', function(opts) {


        let self = this;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

});

riot.tag2('page-footer', '<p class="caption">Status:</p> <p class="status" ref="l1"></p> <p class="copyright">&copy; EDL Co., Ltd. 2019</p>', 'page-footer,[data-is="page-footer"]{ width: 100vw; display: grid; grid-template-columns: 30px 1fr 120px; grid-template-rows: 1fr; grid-template-areas: \'caption status copyright\'; justify-items: stretch; align-items: stretch; font-size: 0.75em; font-weight: bold; background: darkorange; color: whitesmoke; } page-footer .caption,[data-is="page-footer"] .caption{ grid-area: caption; padding-left: 3px; } page-footer .status,[data-is="page-footer"] .status{ grid-area: status; } page-footer .copyright,[data-is="page-footer"] .copyright{ grid-area: copyright; }', '', function(opts) {


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
riot.tag2('screen', '<yield></yield>', 'screen,[data-is="screen"]{ margin: 0 auto; padding: 0; display: none; } screen[active=true],[data-is="screen"][active=true]{ display: block; }', 'active="{opts.active ? true : false}"', function(opts) {


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
riot.tag2('sidebar', '<p> Context A new context is created for each item. These are tag instances. When loops are nested, all the children tags in the loop inherit any of their parent loop’s properties and methods they themselves have undefined. In this way, Riot avoids overriding things that should not be overridden by the parent tag. The parent can be explicitly accessed through the parent variable. For example: In the looped element everything but the each attribute belongs to the child context, so the title can be accessed directly and remove needs to be prefixed with parent. since the method is not a property of the looped item. The looped items are tag instances. Riot does not touch the original items so no new properties are added to them. After the event handler is executed the current tag instance is updated using this.update() (unless you set e.preventUpdate to true in your event handler) which causes all the looped items to execute as well. The parent notices that an item has been removed from the collection and removes the corresponding DOM node from the document. </p>', 'sidebar,[data-is="sidebar"]{ margin: 0 auto; background: silver; }', '', function(opts) {
});