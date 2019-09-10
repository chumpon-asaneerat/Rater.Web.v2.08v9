riot.tag2('app', '<navibar></navibar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 1fr; grid-template-rows: 0px 1fr 0px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navibar][footer],[data-is="app"][navibar][footer]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navibar],[data-is="app"][navibar]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 0px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[footer],[data-is="app"][footer]{ grid-template-columns: 1fr; grid-template-rows: 0px 1fr 20px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app navibar,[data-is="app"] navibar{ grid-area: navibar; overflow: hidden; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 0 2px; overflow: hidden; }', '', function(opts) {
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

riot.tag2('language-menu', '<div class="menu"> <a ref="flags" class="flag-combo" href="javascript:;"> <span class="flag-css flag-icon flag-icon-{lang.current.flagId.toLowerCase()}" ref="css-icon"></span> &nbsp; <div class="flag-text">{lang.langId}</div> &nbsp; <span class="drop-synbol fas fa-caret-down"></span> </a> </div> <div ref="dropItems" class="language-dropbox"> <div each="{item in lang.languages}"> <a class="flag-item {(lang.langId === item.langId) ? \'selected\' : \'\'}" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}" ref="css-icon"></span> &nbsp; <div class="flag-text">{item.Description}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'language-menu,[data-is="language-menu"]{ margin: 0 auto; padding: 0, 2px; } language-menu .menu,[data-is="language-menu"] .menu{ margin: 0 auto; padding: 0; display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr; grid-template-areas: \'flag\'; align-items: center; justify-content: stretch; } language-menu a,[data-is="language-menu"] a{ margin: 0 auto; color: whitesmoke; } language-menu a .flag-item,[data-is="language-menu"] a .flag-item{ height: 30px; display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr; grid-template-areas: \'flag\'; align-items: center; justify-content: stretch; } language-menu a:link,[data-is="language-menu"] a:link,language-menu a:visited,[data-is="language-menu"] a:visited{ text-decoration: none; } language-menu a:hover,[data-is="language-menu"] a:hover,language-menu a:active,[data-is="language-menu"] a:active{ color: yellow; text-decoration: none; } language-menu .flag-combo,[data-is="language-menu"] .flag-combo{ margin: 0 auto; } language-menu .flag-combo .flag-css,[data-is="language-menu"] .flag-combo .flag-css{ margin: 0px auto; padding-top: 1px; width: 20px; display: inline-block; } language-menu .flag-combo .flag-text,[data-is="language-menu"] .flag-combo .flag-text{ margin: 0 auto; display: inline-block; width: 25px; } language-menu .flag-combo .drop-symbol,[data-is="language-menu"] .flag-combo .drop-symbol{ margin: 0 auto; width: 10px; display: inline-block; } language-menu .flag-item,[data-is="language-menu"] .flag-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } language-menu .flag-item:hover,[data-is="language-menu"] .flag-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } language-menu .flag-item.selected,[data-is="language-menu"] .flag-item.selected{ background-color: darkorange; } language-menu .flag-item .flag-css,[data-is="language-menu"] .flag-item .flag-css{ margin: 0px auto; padding-top: 1px; width: 25px; display: inline-block; } language-menu .flag-item .flag-text,[data-is="language-menu"] .flag-item .flag-text{ margin: 0 auto; width: 120px; display: inline-block; } language-menu .language-dropbox,[data-is="language-menu"] .language-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } language-menu .language-dropbox.show,[data-is="language-menu"] .language-dropbox.show{ display: inline-block; }', '', function(opts) {
        let self = this;
        let flags, dropItems;

        let bindEvents = () => {
            document.addEventListener('languagechanged', onLanguageChanged);
            flags.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            flags.removeEventListener('click', toggle);
            document.removeEventListener('languagechanged', onLanguageChanged);
        }

        this.on('mount', () => {
            flags = self.refs['flags'];
            dropItems = self.refs['dropItems'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            dropItems = null;
            flags = null;
        });

        let onLanguageChanged = (e) => { self.update(); }

        let toggle = () => {
            dropItems.classList.toggle('show');
            self.update();
        }

        let isInClassList = (elem, classList) => {
            let len = classList.length;
            let found = false;
            for (let i = 0; i < len; i++) {
                if (elem.matches(classList[i])) {
                    found = true;
                    break;
                }
            }
            return found;
        }

        let checkClickPosition = (e) => {

            let classList = ['.flag-combo', '.flag-css', '.flag-text', '.drop-synbol'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

        this.selectItem = (e) => {
            toggle();
            let selLang = e.item.item;
            lang.change(selLang.langId);

            e.preventDefault();
            e.stopPropagation();
        }
});
riot.tag2('links-menu', '<a ref="burger" href="#"> <span ref="showlinks" class="burger fas fa-bars"></span> </a> <div class="toggle"> </div> <yield></yield>', 'links-menu,[data-is="links-menu"]{ margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } links-menu.dropdown,[data-is="links-menu"].dropdown{ margin: 0 auto; } links-menu .toggle,[data-is="links-menu"] .toggle{ display: inline-block; position: fixed; width: 100px; height: 250px; overflow: hidden; overflow-y: auto; display: none; } links-menu .toggle.show,[data-is="links-menu"] .toggle.show{ display: inline-block; }', '', function(opts) {


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

riot.tag2('navibar', '<div class="banner"> <div>app</div> </div> <language-menu></language-menu> <links-menu></links-menu>', 'navibar,[data-is="navibar"]{ width: 100vw; margin: 0 auto; padding: 0; display: grid; grid-template-columns: 1fr 90px 40px; grid-template-rows: 1fr; grid-template-areas: \'banner lang-menu links-menu\'; background: cornflowerblue; color: whitesmoke; } navibar .banner,[data-is="navibar"] .banner{ grid-area: banner; margin: 0; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar language-menu,[data-is="navibar"] language-menu{ grid-area: lang-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar links-menu,[data-is="navibar"] links-menu{ grid-area: links-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; }', '', function(opts) {
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
riot.tag2('page-footer', '<p class="caption"> {(appcontent.current) ? appcontent.current.footer.label.status + \' : \' : \'Status : \'} </p> <p class="status" ref="l1"></p> <p class="copyright"> &nbsp;&copy; {(appcontent.current) ? appcontent.current.footer.label.copyright : \'EDL Co., Ltd.\'} &nbsp;&nbsp; </p>', 'page-footer,[data-is="page-footer"]{ width: 100vw; display: grid; grid-template-columns: fit-content(50px) 1fr fit-content(150px); grid-template-rows: 1fr; grid-template-areas: \'caption status copyright\'; justify-items: stretch; align-items: stretch; font-size: 0.75em; font-weight: bold; background: darkorange; color: whitesmoke; } page-footer .caption,[data-is="page-footer"] .caption{ grid-area: caption; padding-left: 3px; } page-footer .status,[data-is="page-footer"] .status{ grid-area: status; } page-footer .copyright,[data-is="page-footer"] .copyright{ grid-area: copyright; }', '', function(opts) {


        let self = this;

        let bindEvents = () => {
            document.addEventListener('languagechanged', onLanguageChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('languagechanged', onLanguageChanged);
        }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let onLanguageChanged = (e) => { self.update(); }

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