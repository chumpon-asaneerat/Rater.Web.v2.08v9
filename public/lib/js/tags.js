riot.tag2('app', '<nav-bar class="navibar"></nav-bar> <sidebar class="sidebar"></sidebar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 200px 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'navibar navibar\' \'sidebar scrarea\' \'footer footer\'; overflow: hidden; } app .navibar,[data-is="app"] .navibar{ grid-area: navibar; } app .sidebar,[data-is="app"] .sidebar{ grid-area: sidebar; overflow: auto; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 0 2px; }', '', function(opts) {


        let self = this;
        this.screens = [];

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            bindEvents();

            scanScreens();
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
            self.screens.forEach((screen) => { screen.app(self); })
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

riot.tag2('language-navmenu-item', '<div> <a class="flag" href="#"> <span class="flag-css flag-icon flag-icon-{flagcode}" ref="css-icon"></span> &nbsp; <div class="flag-text">EN</div> &nbsp; <span class="drop-synbol fas fa-caret-down"></span> </a> </div>', 'language-navmenu-item,[data-is="language-navmenu-item"]{ margin: 0 auto; padding: 0, 2px; display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr; grid-template-areas: \'flag\'; align-items: center; justify-content: stretch; } language-navmenu-item a,[data-is="language-navmenu-item"] a{ margin: 0 auto; color: whitesmoke; } language-navmenu-item a:link,[data-is="language-navmenu-item"] a:link,language-navmenu-item a:visited,[data-is="language-navmenu-item"] a:visited{ text-decoration: none; } language-navmenu-item a:hover,[data-is="language-navmenu-item"] a:hover,language-navmenu-item a:active,[data-is="language-navmenu-item"] a:active{ color: yellow; text-decoration: none; } language-navmenu-item .flag,[data-is="language-navmenu-item"] .flag{ margin: 0 auto; display: flex; align-items: center; justify-content: stretch; } language-navmenu-item .flag-css,[data-is="language-navmenu-item"] .flag-css{ margin: 0px auto; padding-top: 1px; display: inline-block; } language-navmenu-item .flag-text,[data-is="language-navmenu-item"] .flag-text{ margin: 0 auto; display: inline-block; } language-navmenu-item .drop-symbol,[data-is="language-navmenu-item"] .drop-symbol{ margin: 0 auto; display: inline-block; }', '', function(opts) {
        let self = this;
        this.flagcode = 'us'
});
riot.tag2('nav-bar', '<screen-navmenu-item></screen-navmenu-item> <div class="banner"> <div>app name</div> </div> <language-navmenu-item></language-navmenu-item> <div class="navmenu"> <a href="#"> <span ref="showlinks" class="burger fas fa-bars" active="true"></span> </a> <a href="#"> <span ref="hidelinks" class="burger fas fa-times"></span> </a> </div> <yield></yield>', 'nav-bar,[data-is="nav-bar"]{ width: 100vw; margin: 0 auto; padding: 0; display: grid; grid-template-columns: 50px 1fr 90px 50px; grid-template-rows: 1fr; grid-template-areas: \'scrmenu banner langmenu navmenu\'; background: cornflowerblue; color: whitesmoke; } nav-bar p,[data-is="nav-bar"] p{ display: inline; padding: 2px; } nav-bar .scrmenu,[data-is="nav-bar"] .scrmenu{ grid-area: scrmenu; margin: 0 auto; display: flex; align-items: center; justify-content: stretch; } nav-bar .banner,[data-is="nav-bar"] .banner{ grid-area: banner; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar language-menu-item,[data-is="nav-bar"] language-menu-item{ grid-area: langmenu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .navmenu,[data-is="nav-bar"] .navmenu{ grid-area: navmenu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } nav-bar .navmenu a,[data-is="nav-bar"] .navmenu a{ color: whitesmoke; } nav-bar .navmenu a:hover,[data-is="nav-bar"] .navmenu a:hover{ color: yellow; } nav-bar .navmenu span.burger,[data-is="nav-bar"] .navmenu span.burger{ display: none; } nav-bar .navmenu span[active=\'true\'].burger,[data-is="nav-bar"] .navmenu span[active=\'true\'].burger{ display: inline-block; }', '', function(opts) {


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
riot.tag2('screen-navmenu-item', '<div class="home-icon"> <a href="#"> <span class="fas fa-home"></span> </a> </div>', 'screen-navmenu-item,[data-is="screen-navmenu-item"]{ margin: 0 auto; padding: 0, 2px; display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr; grid-template-areas: \'home-icon\'; align-items: center; justify-content: stretch; } screen-navmenu-item .home-icon,[data-is="screen-navmenu-item"] .home-icon{ grid-area: home-icon; color: whitesmoke; } screen-navmenu-item a,[data-is="screen-navmenu-item"] a{ margin: 0 auto; color: whitesmoke; } screen-navmenu-item a:link,[data-is="screen-navmenu-item"] a:link,screen-navmenu-item a:visited,[data-is="screen-navmenu-item"] a:visited{ text-decoration: none; } screen-navmenu-item a:hover,[data-is="screen-navmenu-item"] a:hover,screen-navmenu-item a:active,[data-is="screen-navmenu-item"] a:active{ color: yellow; text-decoration: none; }', '', function(opts) {
});
riot.tag2('screen', '<yield></yield>', 'screen,[data-is="screen"]{ margin: 0 auto; padding: 0; display: none; } screen[active=true],[data-is="screen"][active=true]{ display: block; }', 'active="{opts.active ? true : false}"', function(opts) {


        let self = this;
        this.opts.active = false;
        this.app = null;

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let hideOtherScreens = () => {
            let screens = self.app.screens;
            screens.forEach(screen => { if (screen !== self) screen.hide(); })
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