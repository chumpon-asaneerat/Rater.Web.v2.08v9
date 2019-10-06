riot.tag2('app', '<navibar class="navibar"></navibar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 1fr; grid-template-rows: 100%; grid-template-areas: \'scrarea\'; overflow: hidden; } app .navibar,[data-is="app"] .navibar{ display: none } app .footer,[data-is="app"] .footer{ display: none } app[navibar][footer],[data-is="app"][navibar][footer]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navibar][footer] .navibar,[data-is="app"][navibar][footer] .navibar{ display: grid; } app[navibar][footer] .footer,[data-is="app"][navibar][footer] .footer{ display: grid;} app[navibar],[data-is="app"][navibar]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr; grid-template-areas: \'navibar\' \'scrarea\'; overflow: hidden; } app[navibar] .navibar,[data-is="app"][navibar] .navibar{ display: grid; } app[footer],[data-is="app"][footer]{ grid-template-columns: 1fr; grid-template-rows: 1fr 20px; grid-template-areas: \'scrarea\' \'footer\'; overflow: hidden; } app[footer] .footer,[data-is="app"][footer] .footer{ display: grid; } app .navibar,[data-is="app"] .navibar{ grid-area: navibar; padding: 5px; overflow: hidden; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; margin: 0; padding: 0; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 2px 3px 2px 3px; overflow: hidden; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {
            let sobjs = self.tags['screen'];
            if (sobjs) {
                if (!Array.isArray(sobjs)) screenservice.screens.push(sobjs)
                else screenservice.screens.push(...sobjs)
            }
            screenservice.showDefault();
        }
        let freeCtrls = () => {
            screenservice.clear();
        }

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

});

riot.tag2('language-menu', '<div class="menu"> <a ref="flags" class="flag-combo" href="javascript:;"> <span class="flag-css flag-icon flag-icon-{lang.current.flagId.toLowerCase()}" ref="css-icon"></span> <div class="flag-text">&nbsp;{lang.langId}&nbsp;</div> <span class="drop-synbol fas fa-caret-down"></span> </a> </div> <div ref="dropItems" class="language-dropbox"> <div each="{item in lang.languages}"> <a class="flag-item {(lang.langId === item.langId) ? \'selected\' : \'\'}" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}" ref="css-icon"></span> &nbsp; <div class="flag-text">{item.Description}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'language-menu,[data-is="language-menu"]{ margin: 0 auto; padding: 0, 2px; user-select: none; } language-menu .menu,[data-is="language-menu"] .menu{ margin: 0 auto; padding: 0; } language-menu a,[data-is="language-menu"] a{ margin: 0 auto; color: whitesmoke; } language-menu a:link,[data-is="language-menu"] a:link,language-menu a:visited,[data-is="language-menu"] a:visited{ text-decoration: none; } language-menu a:hover,[data-is="language-menu"] a:hover,language-menu a:active,[data-is="language-menu"] a:active{ color: yellow; text-decoration: none; } language-menu .flag-combo,[data-is="language-menu"] .flag-combo{ margin: 0 auto; } language-menu .flag-combo .flag-css,[data-is="language-menu"] .flag-combo .flag-css{ margin: 0px auto; padding-top: 1px; display: inline-block; } language-menu .flag-combo .flag-text,[data-is="language-menu"] .flag-combo .flag-text{ margin: 0 auto; display: inline-block; } language-menu .flag-combo .drop-symbol,[data-is="language-menu"] .flag-combo .drop-symbol{ margin: 0 auto; display: inline-block; } language-menu .flag-item,[data-is="language-menu"] .flag-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } language-menu .flag-item:hover,[data-is="language-menu"] .flag-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } language-menu .flag-item.selected,[data-is="language-menu"] .flag-item.selected{ background-color: darkorange; } language-menu .flag-item .flag-css,[data-is="language-menu"] .flag-item .flag-css{ margin: 0px auto; padding-top: 1px; width: 25px; display: inline-block; } language-menu .flag-item .flag-text,[data-is="language-menu"] .flag-item .flag-text{ margin: 0 auto; min-width: 80px; max-width: 120px; display: inline-block; } language-menu .language-dropbox,[data-is="language-menu"] .language-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } language-menu .language-dropbox.show,[data-is="language-menu"] .language-dropbox.show{ display: inline-block; z-index: 99999; }', '', function(opts) {


        let self = this;

        let updatecontent = () => {
            self.update();
        }

        let flags, dropItems;

        let initCtrls = () => {
            flags = self.refs['flags'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            flags = null;
        }
        let clearInputs = () => {}

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
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onLanguageChanged = (e) => { updatecontent(); }

        this.selectItem = (e) => {
            toggle();
            let selLang = e.item.item;
            lang.change(selLang.langId);

            e.preventDefault();
            e.stopPropagation();
        }

        let toggle = () => {
            dropItems.classList.toggle('show');
            updatecontent();
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

});
riot.tag2('links-menu', '<div class="menu"> <a ref="links" class="link-combo" href="javascript:;"> <span ref="showlinks" class="burger fas fa-bars"></span> </a> </div> <div ref="dropItems" class="links-dropbox"> <div each="{item in menus}"> <a class="link-item" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="link-css {item.icon}" ref="css-icon">&nbsp;</span> <div class="link-text">&nbsp;{item.text}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'links-menu,[data-is="links-menu"]{ margin: 0 auto; padding: 0 3px; user-select: none; } links-menu .menu,[data-is="links-menu"] .menu{ margin: 0 auto; padding: 0; } links-menu a,[data-is="links-menu"] a{ margin: 0 auto; color: whitesmoke; } links-menu a:link,[data-is="links-menu"] a:link,links-menu a:visited,[data-is="links-menu"] a:visited{ text-decoration: none; } links-menu a:hover,[data-is="links-menu"] a:hover,links-menu a:active,[data-is="links-menu"] a:active{ color: yellow; text-decoration: none; } links-menu .link-combo,[data-is="links-menu"] .link-combo{ margin: 0 auto; } links-menu .link-item,[data-is="links-menu"] .link-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } links-menu .link-item:hover,[data-is="links-menu"] .link-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } links-menu .link-item.selected,[data-is="links-menu"] .link-item.selected{ background-color: darkorange; } links-menu .link-item .link-css,[data-is="links-menu"] .link-item .link-css{ margin: 0px auto; width: 25px; display: inline-block; } links-menu .link-item .link-text,[data-is="links-menu"] .link-item .link-text{ margin: 0 auto; min-width: 80px; max-width: 120px; display: inline-block; } links-menu .links-dropbox,[data-is="links-menu"] .links-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } links-menu .links-dropbox.show,[data-is="links-menu"] .links-dropbox.show{ display: inline-block; z-index: 99999; }', '', function(opts) {


        let self = this;

        this.menus = [];
        let updatecontent = () => {
            self.menus = (screenservice.content) ? screenservice.content.links : [];
            self.update();
        }

        let links, dropItems;

        let initCtrls = () => {
            links = self.refs['links'];
            dropItems = self.refs['dropItems'];
        }
        let freeCtrls = () => {
            dropItems = null;
            links = null;
        }
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
            links.addEventListener('click', toggle);
            window.addEventListener('click', checkClickPosition);
        }
        let unbindEvents = () => {
            window.removeEventListener('click', checkClickPosition);
            links.removeEventListener('click', toggle);
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) =>  { updatecontent(); }
        let onScreenChanged = (e) =>  { updatecontent(); }

        this.selectItem = (e) => {
            toggle();
            let selLink = e.item.item;
            let linkType = (selLink.type) ? selLink.type.toLowerCase() : '';
            if (linkType  === 'screen') {
                screenservice.show(selLink.ref);
            }
            else if (linkType === 'url') {
                secure.postUrl(selLink.ref);
            }
            else if (linkType === 'cmd') {
                if (selLink.ref.toLowerCase() === 'signout')
                secure.signout();
            }
            else {
                console.log('Not implements type, data:', selLink);
            }
            e.preventDefault();
            e.stopPropagation();
        }

        let toggle = () => {
            dropItems.classList.toggle('show');
            updatecontent();
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

            let classList = ['.link-combo', '.burger'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }

});

riot.tag2('navibar', '<div class="banner"> <div class="title">My Choice Rater Web</div> </div> <language-menu></language-menu> <links-menu></links-menu>', 'navibar,[data-is="navibar"]{ width: 100vw; margin: 0 auto; display: grid; grid-template-columns: 1fr 90px 40px; grid-template-rows: 1fr; grid-template-areas: \'banner lang-menu links-menu\'; background: cornflowerblue; color: whitesmoke; user-select: none; } navibar .banner,[data-is="navibar"] .banner{ grid-area: banner; margin: 0; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar .banner .title,[data-is="navibar"] .banner .title{ margin: 0; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.2rem; } navibar language-menu,[data-is="navibar"] language-menu{ grid-area: lang-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar links-menu,[data-is="navibar"] links-menu{ grid-area: links-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; }', '', function(opts) {
});
riot.tag2('page-footer', '<p class="caption"> {(appcontent.current) ? appcontent.current.footer.label.status + \' : \' : \'Status : \'} </p> <p class="status" ref="l1"></p> <p class="copyright"> &nbsp;&copy; {(appcontent.current) ? appcontent.current.footer.label.copyright : \'EDL Co., Ltd.\'} &nbsp;&nbsp; </p>', 'page-footer,[data-is="page-footer"]{ margin: 0 auto; padding: 0; width: 100%; display: grid; grid-template-columns: fit-content(50px) 1fr fit-content(150px); grid-template-rows: 1fr; grid-template-areas: \'caption status copyright\'; font-size: 0.7em; font-weight: bold; background: darkorange; color: whitesmoke; } page-footer .caption,[data-is="page-footer"] .caption{ grid-area: caption; margin: 0 auto; padding-top: 2px; padding-left: 3px; user-select: none; } page-footer .status,[data-is="page-footer"] .status{ grid-area: status; margin: 0 auto; padding-top: 2px; user-select: none; } page-footer .copyright,[data-is="page-footer"] .copyright{ grid-area: copyright; margin: 0 auto; padding-top: 2px; user-select: none; }', '', function(opts) {


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
    
riot.tag2('screen', '<div class="content-area"> <yield></yield> </div> </script>', 'screen,[data-is="screen"]{ margin: 0 auto; padding: 0; display: none; width: 100%; height: 100%; } screen.show,[data-is="screen"].show{ display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; } screen .content-area,[data-is="screen"] .content-area{ width: 100%; height: 100%; overflow: hidden; }', '', function(opts) {


        let self = this;

        let updatecontent = () => { self.update(); }

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        let hideOtherScreens = () => {
            let screens = screenservice.screens;
            if (screens) {
                screens.forEach(screen => { if (screen !== self) screen.hide(); })
            }
        }

        this.hide = () => {
            self.root.classList.remove('show')
            updatecontent();
        }
        this.show = () => {
            hideOtherScreens();
            self.root.classList.add('show');
            updatecontent();
        }

});
riot.tag2('dual-screen', '<div class="auto-container"> <div ref="flipper" class="flipper"> <div class="viewer-block"> <div class="content"> <yield from="viewer"></yield> </div> </div> <div class="entry-block"> <div class="content"> <yield from="entry"></yield> </div> </div> </div> </div>', 'dual-screen,[data-is="dual-screen"]{ margin: 0; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'auto-container\'; overflow: hidden; } dual-screen .auto-container,[data-is="dual-screen"] .auto-container{ margin: 0; padding: 0; grid-area: auto-container; border: 1px solid #f1f1f1; } dual-screen .flipper,[data-is="dual-screen"] .flipper{ margin: 0; padding: 0; position: relative; } dual-screen .auto-container .flipper.toggle,[data-is="dual-screen"] .auto-container .flipper.toggle{ cursor: auto; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ margin: 0; padding: 0; backface-visibility: hidden; } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ margin: 0; padding: 0; backface-visibility: hidden; background-color: dimgray; color: white; } dual-screen .content,[data-is="dual-screen"] .content{ position: relative; display: block; width: 100%; height: 100%; } @media only screen and (max-width: 700px) { dual-screen .flipper,[data-is="dual-screen"] .flipper{ width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; } dual-screen .auto-container .flipper.toggle,[data-is="dual-screen"] .auto-container .flipper.toggle{ transform: rotateY(180deg); } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ position: absolute; width: 100%; height: 100%; } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ position: absolute; width: 100%; height: 100%; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ transform: rotateY(0deg); } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ transform: rotateY(180deg); } } @media only screen and (min-width: 700px) and (max-width: 1600px) { dual-screen .flipper,[data-is="dual-screen"] .flipper{ width: 100%; height: 100%; display: grid; grid-gap: 5px 5px; grid-template-columns: 3fr 2fr; grid-template-rows: 1fr; grid-template-areas: \'viewer entry\'; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ grid-area: viewer; display: block; position: relative; width: 100%; height: 100%; border: 1px solid blueviolet; } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ grid-area: entry; display: block; position: relative; width: 100%; height: 100%; border: 1px solid forestgreen; } }', '', function(opts) {


        let self = this;

        let flipper;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {}

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }

});
riot.tag2('flip-screen', '<div class="auto-container"> <div ref="flipper" class="flipper"> <div class="viewer-block"> <div class="content"> <yield from="viewer"></yield> </div> </div> <div class="entry-block"> <div class="content"> <yield from="entry"></yield> </div> </div> </div> </div>', 'flip-screen,[data-is="flip-screen"]{ margin: 0; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'auto-container\'; overflow: hidden; } flip-screen .auto-container,[data-is="flip-screen"] .auto-container{ margin: 0; padding: 0; grid-area: auto-container; border: 1px solid #f1f1f1; } flip-screen .flipper,[data-is="flip-screen"] .flipper{ margin: 0; padding: 0; position: relative; width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; } flip-screen .auto-container .flipper.toggle,[data-is="flip-screen"] .auto-container .flipper.toggle{ transform: rotateY(180deg); } flip-screen .viewer-block,[data-is="flip-screen"] .viewer-block{ position: absolute; margin: 0; padding: 0; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(0deg); } flip-screen .entry-block,[data-is="flip-screen"] .entry-block{ position: absolute; width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); background-color: dimgray; color: white; } flip-screen .content,[data-is="flip-screen"] .content{ position: relative; display: block; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;

        let flipper;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {}

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }

});
riot.tag2('ninput', '<input ref="input" type="{opts.type}" name="{opts.name}" required=""> <div ref="clear" class="clear">x</div> <label>{opts.title}</label>', 'ninput,[data-is="ninput"]{ margin: 0; padding: 10px; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: white; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } ninput input,[data-is="ninput"] input{ display: inline-block; padding: 5px 0; margin-bottom: 5px; width: calc(100% - 25px); background-color: rgba(255, 255, 255, .2); box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-bottom: 2px solid #999; } ninput .clear,[data-is="ninput"] .clear{ display: inline-block; margin: 0 auto; padding: 0px 5px; font-size: 14px; font-weight: bold; width: 20px; height: 20px; color: white; cursor: pointer; user-select: none; border: 1px solid red; border-radius: 50%; background: rgba(255, 100, 100, .75); } ninput .clear:hover,[data-is="ninput"] .clear:hover{ color: yellow; background: rgba(255, 0, 0, .8); } ninput input:-webkit-autofill,[data-is="ninput"] input:-webkit-autofill,ninput input:-webkit-autofill:hover,[data-is="ninput"] input:-webkit-autofill:hover,ninput input:-webkit-autofill:focus,[data-is="ninput"] input:-webkit-autofill:focus{ font-size: 14px; transition: background-color 5000s ease-in-out 0s; } ninput label,[data-is="ninput"] label{ position: absolute; top: 15px; left: 14px; color: #999; transition: .2s; pointer-events: none; } ninput input:focus ~ label,[data-is="ninput"] input:focus ~ label,ninput input:-webkit-autofill ~ label,[data-is="ninput"] input:-webkit-autofill ~ label,ninput input:valid ~ label,[data-is="ninput"] input:valid ~ label{ top: -10px; left: 10px; color: #f7497d; font-weight: bold; } ninput input:focus,[data-is="ninput"] input:focus,ninput input:valid,[data-is="ninput"] input:valid{ border-bottom: 2px solid #f7497d; }', '', function(opts) {


        let self = this;

        let input, clear;

        let initCtrls = () => {
            input = self.refs['input'];
            clear = self.refs['clear'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {
            input = null;
            clear = null;
        }

        let bindEvents = () => {
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

        let onClear = () => {
            if (input) input.value = '';
        }

        this.clear = () => { if (input) input.value = ''; }
        this.focus = () => { if (input) input.focus(); }
        this.value = () => {
            let ret;
            if (input) {

                let args = arguments.Arguments;
                if (args && args.length > 0) {
                    input.value = args[0];
                }
                else {
                    ret = input.value;
                }
            }
            return ret;
        }

});
riot.tag2('osd', '', 'osd,[data-is="osd"]{ margin: 0 auto; padding: 0; }', '', function(opts) {


        let self = this;

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

});
riot.tag2('card-sample', '<dual-screen ref="flipper"> <yield to="viewer"> <div ref="view" class="view"> <div ref="grid" id="grid"></div> </div> </yield> <yield to="entry"> <div ref="entry" class="entry"> <div class="head"> <h1>John Doe</h1> <p>Architect & Engineer</p> <p>We love that guy</p> </div> <div class="input-ui"> <input type="text" value="" placeholder="enter some text"> <button ref="submit">Submit</button> </div> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>Architect & Engineer</p> </div> </yield> </dual-screen>', 'card-sample,[data-is="card-sample"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } card-sample .view,[data-is="card-sample"] .view,card-sample .entry,[data-is="card-sample"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; max-height: calc(100vh - 64px); overflow: auto; } card-sample .head,[data-is="card-sample"] .head{ text-align: center; } card-sample .input-ui,[data-is="card-sample"] .input-ui{ margin: 0 auto; padding: 5px; width: auto; }', '', function(opts) {
        let self = this;
        let flipper, view, submit, table;

        let bindEvents = () => {
            document.addEventListener('screenchanged', screenchanged);
            view.addEventListener('click', toggle);

            submit.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            submit.removeEventListener('click', toggle);

            view.removeEventListener('click', toggle);
            document.removeEventListener('screenchanged', screenchanged);
        }

        let screenchanged = (e) => {
            if (e.detail.screenId === 'home') {
                table.redraw(true)
            }
        }

        let initGrid = () => {
            let tabledata = [
                {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
                {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            ];
            table = new Tabulator("#grid", {
                height: "100%",
                layout:"fitData",

                columns: [
                    { title: "Name", field: "name" },
                    { title: "Age", field: "age" },
                    { title: "Favourite Color", field: "col" },
                    { title: "Date Of Birth", field: "dob", align: "center" },
                    { title: "Progress", field:"progress", sorter: "number" },
                    { title: "Gender", field: "gender" }
                ],
                rowClick: (e, row) => {
                    console.log("Row " + row.getIndex() + " Clicked!!!!")
                    console.log('Selected data:', row.getData())
                }
            });
            table.setData(tabledata)
        }

        this.on('mount', () => {
            flipper = self.refs['flipper'];

            view = flipper.refs['view'];

            submit = flipper.refs['submit'];
            grid = flipper.refs['grid'];
            bindEvents();

            initGrid();
        });
        this.on('unmount', () => {
            unbindEvents();
            grid = null;
            submit = null;

            view = null;
            flipper = null;
        });

        let toggle = () => {
            flipper.toggle();
        }
});
riot.tag2('flip-container', '<div class="auto-container"> <div ref="flipper" class="flipper"> <div class="viewer-div"> <yield from="viewer"></yield> </div> <div class="entry-div"> <yield from="entry"></yield> </div> </div> </div>', 'flip-container,[data-is="flip-container"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'auto-container\'; overflow: hidden; } flip-container .auto-container,[data-is="flip-container"] .auto-container{ grid-area: auto-container; background-color: transparent; border: 1px solid #f1f1f1; } flip-container .flipper,[data-is="flip-container"] .flipper{ position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; } flip-container .auto-container .flipper.toggle,[data-is="flip-container"] .auto-container .flipper.toggle{ transform: rotateY(180deg); } flip-container .viewer-div,[data-is="flip-container"] .viewer-div,flip-container .entry-div,[data-is="flip-container"] .entry-div{ position: absolute; width: 100%; height: 100%; backface-visibility: hidden; } flip-container .viewer-div,[data-is="flip-container"] .viewer-div{ transform: rotateY(0deg); } flip-container .entry-div,[data-is="flip-container"] .entry-div{ background-color: dodgerblue; color: white; transform: rotateY(180deg); }', '', function(opts) {
        let self = this;
        let flipper;

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            flipper = self.refs['flipper'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            flipper = null;
        });

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }
});
riot.tag2('table-edit', '', '', '', function(opts) {
});
riot.tag2('branch-grid', '', '', '', function(opts) {
});
riot.tag2('membertype-grid', '', '', '', function(opts) {
});
riot.tag2('avg-vote-counter', '', '', '', function(opts) {
});
riot.tag2('total-vote-counter', '', '', '', function(opts) {
});
riot.tag2('device-entry', '', 'device-entry,[data-is="device-entry"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('admin-home', '', 'admin-home,[data-is="admin-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('device-home', '', 'device-home,[data-is="device-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('exclusive-home', '', 'exclusive-home,[data-is="exclusive-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('staff-home', '', 'staff-home,[data-is="staff-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('member-entry', '', 'member-entry,[data-is="member-entry"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'staffeditor';

        let defaultContent = {
            title: 'Staff Information',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {
        }
        let freeCtrls = () => {
        }
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

                table.redraw(true);
            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('member-screen', '', 'member-screen,[data-is="member-screen"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('member-view', '', 'member-view,[data-is="member-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('branch-entry', '', 'branch-entry,[data-is="branch-entry"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('branch-view', '', 'branch-view,[data-is="branch-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('org-entry', '', 'org-entry,[data-is="org-entry"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('org-view', '', 'org-view,[data-is="org-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('question-runtime', '', 'question-runtime,[data-is="question-runtime"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('raw-vote-view', '', 'raw-vote-view,[data-is="raw-vote-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('staff-perf-view', '', 'staff-perf-view,[data-is="staff-perf-view"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('vote-summary', '', 'vote-summary,[data-is="vote-summary"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('dev-grid', '<div ref="grid" id="grid"></div>', 'dev-grid,[data-is="dev-grid"]{ display: block; margin: 0 auto; padding: 0; width: 100%; height: 100%; } dev-grid .item,[data-is="dev-grid"] .item{ display: inline-block; color: dimgray; }', '', function(opts) {


        let self = this;
        let screenId = 'home';

        let defaultContent = {
            title: 'Dev Grid',
            label: {}
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {
            initGrid();
        }
        let freeCtrls = () => { }
        let clearInputs = () => { }

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => {
            updatecontent();
            table.redraw(true);
        }
        let onLanguageChanged = (e) => {
            if (lang.current.langId === 'TH') {

                table.clearData();
                table.setData(tabledata2);
                table.redraw(true);
            }
            else {

                table.clearData();
                table.setData(tabledata);
                table.redraw(true);
            }
            updatecontent();
        }
        let onScreenChanged = (e) => {
            updatecontent();
            table.redraw(true);
            if (e.detail.screenId === screenId) {
            }
            else {
            }
        }

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let tabledata = [
                {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
                {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            ];
            let tabledata2 = [
                {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
                {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
                {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
                {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
                {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
                {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
                {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"}
            ];

        let initGrid = () => {
            let opts = {
                height: "100%",
                layout: "fitDataFill",

                columns: [
                    { formatter: editIcon, align:"center", width:44,
                      resizable: false, frozen: true, headerSort: false,
                      cellClick: (e, cell) => {
                          console.log("Edit Row : " + cell.getRow().getData().name)
                      }
                    },
                    { formatter: deleteIcon, align:"center", width: 44,
                      resizable: false, frozen: true, headerSort: false,
                      cellClick: (e, cell) => {
                          console.log("Delete Row : " + cell.getRow().getData().name)
                      }
                    },

                    { title: "Name", field: "name", resizable: false },
                    { title: "Age", field: "age", resizable: false },
                    { title: "Favourite Color", field: "col", resizable: false },
                    { title: "Date Of Birth", field: "dob", align: "center", resizable: false },
                    { title: "Progress", field:"progress", sorter: "number", resizable: false },
                    { title: "Gender", field: "gender", resizable: false },
                    { title: "Col A", field: "a", resizable: false },
                    { title: "Col B", field: "b", resizable: false },
                    { title: "Col C", field: "c", resizable: false },
                    { title: "Col D", field: "d", resizable: false },
                    { title: "Col E", field: "e", resizable: false },
                    { title: "Col F", field: "f", resizable: false },
                    { title: "Col End", field: "end", resizable: false}
                ]
            }

            table = new Tabulator("#grid", opts);
            initData(tabledata)
        }

        let initData = (data) => {
            table.setData(data)
        }
});
riot.tag2('dev-home', '<div id="item"> Sample Data </div>', 'dev-home,[data-is="dev-home"]{ display: block; margin: 0 auto; padding: 0; width: 100%; height: 100%; } dev-home .item,[data-is="dev-home"] .item{ display: inline-block; color: dimgray; }', '', function(opts) {
});
riot.tag2('product-card', '', '', '', function(opts) {
});
riot.tag2('product-list', '', '', '', function(opts) {
});
riot.tag2('customer-entry', '', 'customer-entry,[data-is="customer-entry"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('edl-admin-home', '', 'edl-admin-home,[data-is="edl-admin-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('edl-staff-home', '', 'edl-staff-home,[data-is="edl-staff-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('edl-supervisor-home', '', 'edl-supervisor-home,[data-is="edl-supervisor-home"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('user-entry', '', 'user-entry,[data-is="user-entry"]{ margin: 0 auto; }', '', function(opts) {


        let self = this;
        let screenId = 'screenid';

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {

            }
            else {

            }
        }

        let showMsg = (err) => { }

        this.publicMethod = (message) => { }

});
riot.tag2('rater-home', '<h1>Rater Web Home</h1>', 'rater-home,[data-is="rater-home"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; display: block; }', '', function(opts) {


        let self = this;
        let screenId = 'home';

        let defaultContent = {
            title: 'Rater Web Home',
            label: {
                screenTitle: 'Rater Web Home'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            bindEvents();
            initCtrls();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let showMsg = (err) => { }

});
riot.tag2('register-entry', '<div class="content-area"> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="group-header"> <h4><span class="fas fa-save">&nbsp;</span>&nbsp;{content.title}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <div class="padtop"></div> <ninput ref="customerName" title="{content.label.customerName}" type="text" name="customerName"></ninput> <div class="padtop"></div> <ninput ref="userName" title="{content.label.userName}" type="text" name="userName"></ninput> <div class="padtop"></div> <ninput ref="passWord" title="{content.label.passWord}" type="password" name="pwd"></ninput> <div class="padtop"></div> <button ref="submit"> <span class="fas fa-save">&nbsp;</span> {content.label.submit} </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div>', 'register-entry,[data-is="register-entry"]{ margin: 0 auto; padding: 2px; position: relative; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; overflow: hidden; } register-entry .content-area,[data-is="register-entry"] .content-area{ grid-area: content-area; margin: 0 auto; padding: 0px; position: relative; display: block; width: 100%; height: 100%; background-color: white; background-image: url(\'public/assets/images/backgrounds/bg-08.jpg\'); background-blend-mode: multiply, luminosity; background-position: center; background-repeat: no-repeat; background-size: cover; } register-entry .padtop,[data-is="register-entry"] .padtop,register-entry .content-area .padtop,[data-is="register-entry"] .content-area .padtop,register-entry .content-area .group-header .padtop,[data-is="register-entry"] .content-area .group-header .padtop,register-entry .content-area .group-body .padtop,[data-is="register-entry"] .content-area .group-body .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; } register-entry .content-area .group-header,[data-is="register-entry"] .content-area .group-header{ display: block; margin: 0 auto; padding: 3px; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: cornflowerblue; border: 1px solid dimgray; border-radius: 8px 8px 0 0; } register-entry .content-area .group-header h4,[data-is="register-entry"] .content-area .group-header h4{ display: block; margin: 0 auto; padding: 0; padding-top: 5px; font-size: 1.1rem; text-align: center; color: whitesmoke; user-select: none; } register-entry .content-area .group-body,[data-is="register-entry"] .content-area .group-body{ display: flex; flex-direction: column; align-items: center; margin: 0 auto; padding: 0; height: auto; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background: white; border: 1px solid dimgray; border-radius: 0 0 8px 8px; } register-entry .content-area .group-body button,[data-is="register-entry"] .content-area .group-body button{ display: inline-block; margin: 5px auto; padding: 10px 15px; color: forestgreen; font-weight: bold; cursor: pointer; width: 45%; }', '', function(opts) {


        let self = this;
        let screenId = 'register';

        let defaultContent = {
            title: 'Register',
            label: {
                customerName: 'Customer Name',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Reister'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let customerName, userName, passWord, submit;

        let initCtrls = () => {
            customerName = self.refs['customerName'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
        }
        let freeCtrls = () => {
            customerName = null;
            userName = null;
            passWord = null;
            submit = null;
        }
        let clearInputs = () => {
            if (customerName && userName && passWord) {
                customerName.clear();
                userName.clear();
                passWord.clear();
            }
        }
        let checkCustomerName = () => {
            let ret = false;
            let val = customerName.value();
            ret = (val && val.length > 0);
            if (!ret) customerName.focus()
            return ret;
        }
        let checkUserName = () => {
            let ret = false;
            let val = userName.value();
            ret = (val && val.length > 0);
            if (!ret) userName.focus()
            return ret;
        }
        let checkPassword = () => {
            let ret = false;
            let val = passWord.value();
            ret = (val && val.length > 0);
            if (!ret) passWord.focus()
            return ret;
        }

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
            document.addEventListener('registersuccess', onRegisterSuccess);
            document.addEventListener('registerfailed', onRegisterFailed);
            submit.addEventListener('click', onSubmit);
        }
        let unbindEvents = () => {
            submit.removeEventListener('click', onSubmit);
            document.addEventListener('registerfailed', onRegisterFailed);
            document.addEventListener('registersuccess', onRegisterSuccess);
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {
                customerName.focus();
            }
            else {
                clearInputs();
            }
        }

        let onRegisterSuccess = (e) => {
            screenservice.showDefault();
            clearInputs();
        }
        let onRegisterFailed = (e) => {
            let err = { msg: 'register failed.' }
            showMsg(err);
        }
        let onSubmit = (e) => {
            if (checkCustomerName() && checkUserName() && checkPassword()) {

                let data = {
                    customerName: customerName.value(),
                    userName: userName.value(),
                    passWord: passWord.value(),
                    licenseTypeId: 0
                }
                secure.register(data.customerName, data.userName, data.passWord, data.licenseTypeId);
            }
        }

        let showMsg = (err) => {
            logger.info(err);
        }

});
riot.tag2('signin-entry', '<div class="content-area"> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div class="padtop"></div> <div ref="userSignIn" class="user-signin"> <div class="group-header"> <h4><span class="fa fa-user-lock">&nbsp;</span>&nbsp;{content.title}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <div class="padtop"></div> <ninput ref="userName" title="{content.label.userName}" type="text" name="userName"></ninput> <div class="padtop"></div> <ninput ref="passWord" title="{content.label.passWord}" type="password" name="pwd"></ninput> <div class="padtop"></div> <button ref="submit"> <span class="fas fa-user">&nbsp;</span> {content.label.submit} </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> <div ref="userSelection" class="user-selection hide"> <div class="group-header"> <h4>{content.label.selectAccount}</h4> <div class="padtop"></div> </div> <div class="group-body"> <div class="padtop"></div> <div class="padtop"></div> <user-selection ref="userList" customername="{content.label.customerName}""></user-selection> <div class="padtop"></div> <button ref="cancel"> <span class="fa fa-user-times">&nbsp;</span> Cancel </button> <div class="padtop"></div> <div class="padtop"></div> </div> </div> </div>', 'signin-entry,[data-is="signin-entry"]{ margin: 0 auto; padding: 2px; position: relative; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'content-area\'; overflow: hidden; } signin-entry .content-area,[data-is="signin-entry"] .content-area{ grid-area: content-area; margin: 0 auto; padding: 0px; position: relative; display: block; width: 100%; height: 100%; background-color: white; background-image: url(\'public/assets/images/backgrounds/bg-15.jpg\'); background-blend-mode: multiply, luminosity; background-position: center; background-repeat: no-repeat; background-size: cover; } signin-entry .content-area .user-signin,[data-is="signin-entry"] .content-area .user-signin,signin-entry .content-area .user-selection,[data-is="signin-entry"] .content-area .user-selection{ display: block; position: relative; margin: 0 auto; padding: 0; } signin-entry .content-area .user-signin.hide,[data-is="signin-entry"] .content-area .user-signin.hide,signin-entry .content-area .user-selection.hide,[data-is="signin-entry"] .content-area .user-selection.hide{ display: none; } signin-entry .padtop,[data-is="signin-entry"] .padtop,signin-entry .content-area .padtop,[data-is="signin-entry"] .content-area .padtop,signin-entry .content-area .user-signin .group-header .padtop,[data-is="signin-entry"] .content-area .user-signin .group-header .padtop,signin-entry .content-area .user-signin .group-body .padtop,[data-is="signin-entry"] .content-area .user-signin .group-body .padtop,signin-entry .content-area .user-selection .group-header .padtop,[data-is="signin-entry"] .content-area .user-selection .group-header .padtop,signin-entry .content-area .user-selection .group-body .padtop,[data-is="signin-entry"] .content-area .user-selection .group-body .padtop{ display: block; margin: 0 auto; width: 100%; min-height: 10px; } signin-entry .content-area .user-signin .group-header,[data-is="signin-entry"] .content-area .user-signin .group-header,signin-entry .content-area .user-selection .group-header,[data-is="signin-entry"] .content-area .user-selection .group-header{ display: block; margin: 0 auto; padding: 3px; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background-color: cornflowerblue; border: 1px solid dimgray; border-radius: 8px 8px 0 0; } signin-entry .content-area .user-signin .group-header h4,[data-is="signin-entry"] .content-area .user-signin .group-header h4,signin-entry .content-area .user-selection .group-header h4,[data-is="signin-entry"] .content-area .user-selection .group-header h4{ display: block; margin: 0 auto; padding: 0; padding-top: 5px; font-size: 1.1rem; text-align: center; color: whitesmoke; user-select: none; } signin-entry .content-area .user-signin .group-body,[data-is="signin-entry"] .content-area .user-signin .group-body,signin-entry .content-area .user-selection .group-body,[data-is="signin-entry"] .content-area .user-selection .group-body{ display: flex; flex-direction: column; align-items: center; margin: 0 auto; padding: 0; height: auto; width: 30%; min-width: 300px; max-width: 500px; opacity: 0.8; background: white; border: 1px solid dimgray; border-radius: 0 0 8px 8px; } signin-entry .content-area .user-signin .group-body button,[data-is="signin-entry"] .content-area .user-signin .group-body button,signin-entry .content-area .user-selection .group-body button,[data-is="signin-entry"] .content-area .user-selection .group-body button{ display: inline-block; margin: 5px auto; padding: 10px 15px; color: forestgreen; font-weight: bold; cursor: pointer; width: 45%; text-decoration: none; vertical-align: middle; }', '', function(opts) {


        let self = this;
        let screenId = 'signin';

        let defaultContent = {
            title: 'Sign In',
            label: {
                selectAccount: 'Please Select Account',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Sign In',
                customerName: 'Customer Name'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        let userSignIn, userSelection;
        let userName, passWord, submit, cancel;

        let initCtrls = () => {
            userSignIn = self.refs['userSignIn'];
            userSelection = self.refs['userSelection'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
            cancel = self.refs['cancel'];
        }
        let freeCtrls = () => {
            userName = null;
            passWord = null;
            submit = null;
            cancel = null;
            userSignIn = null;
            userSelection = null;
        }
        let clearInputs = () => {
            if (userName && passWord) {
                userName.clear();
                passWord.clear();
            }
            secure.reset();
        }
        let checkUserName = () => {
            let ret = false;
            let val = userName.value();
            ret = (val && val.length > 0);
            if (!ret) userName.focus()
            return ret;
        }
        let checkPassword = () => {
            let ret = false;
            let val = passWord.value();
            ret = (val && val.length > 0);
            if (!ret) passWord.focus()
            return ret;
        }

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
            document.addEventListener('userlistchanged', onUserListChanged);
            document.addEventListener('signinfailed', onSignInFailed);
            submit.addEventListener('click', onSubmit);
            cancel.addEventListener('click', onCancel);
        }
        let unbindEvents = () => {
            cancel.removeEventListener('click', onCancel);
            submit.removeEventListener('click', onSubmit);
            document.removeEventListener('signinfailed', onSignInFailed);
            document.removeEventListener('userlistchanged', onUserListChanged);
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {
                showUserSignIn();
            }
            else {
                clearInputs();
            }
        }

        let onUserListChanged = (e) => { showUserSelection(); }
        let onSignInFailed = (e) => {
            let err = e.detail.error;
            showMsg(err);
        }
        let onSubmit = (e) => {
            if (checkUserName() && checkPassword()) {

                let data = {
                    userName: userName.value(),
                    passWord: passWord.value()
                }
                secure.verifyUsers(data.userName, data.passWord);
            }
        }
        let onCancel = (e) => { showUserSignIn(); }

        let showMsg = (err) => {
            logger.info(err);
            secure.reset();
        }

        let showUserSignIn = () => {
            if (userSignIn && userSelection) {
                userSignIn.classList.remove('hide');
                userSelection.classList.add('hide');
                userName.focus();
            }
        }
        let showUserSelection = () => {
            if (userSignIn && userSelection) {
                if (secure.users.length > 1) {

                    userSignIn.classList.add('hide');
                    userSelection.classList.remove('hide');
                }
                else if (secure.users.length === 1) {

                    let customerId = secure.users[0].customerId;
                    secure.signin(customerId);
                }
                else {
                    showMsg({ msg: 'No user found!!!.'})
                }
            }
        }

});
riot.tag2('user-selection', '<virtual each="{user in users}"> <div class="account"> <div class="label">{opts.customername}</div> <div class="data">{user.CustomerName}</div> <button onclick="{onSignIn}">&nbsp;<span class="fas fa-sign-in-alt">&nbsp;</span></button> </div> <hr> </virtual>', 'user-selection,[data-is="user-selection"]{ display: block; margin: 0 auto; padding: 0; } user-selection .account,[data-is="user-selection"] .account{ margin: 0 auto; padding: 0; height: 100%; width: 100%; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; grid-template-areas: \'label button\' \'data button\'; overflow: hidden; overflow-y: auto; } user-selection .account .label,[data-is="user-selection"] .account .label{ grid-area: label; display: block; margin: 0 auto; padding: 0; font-weight: bold; color: navy; width: 100%; } user-selection .account .data,[data-is="user-selection"] .account .data{ grid-area: data; display: block; margin: 0 auto; padding: 0; font-weight: bold; color: forestgreen; width: 100%; } user-selection .account button,[data-is="user-selection"] .account button{ grid-area: button; display: inline-block; margin: 0 auto; padding: 0; font-weight: bold; color: forestgreen; width: 100%; }', '', function(opts) {


        let self = this;
        let screenId = 'signin';

        this.users = [];

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.users = (secure.content) ? secure.users : [];
                self.update();
            }
        }

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('userlistchanged', onUserListChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('userlistchanged', onUserListChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onUserListChanged = (e) => { updatecontent(); }

        this.onSignIn = (e) => {
            let acc = e.item.user;
            secure.signin(acc.customerId);
        }

        let showMsg = (err) => { }

});