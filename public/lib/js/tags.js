riot.tag2('app', '<navibar></navibar> <div class="scrarea"> <yield></yield> </div> <page-footer class="footer"></page-footer>', 'app,[data-is="app"]{ margin: 0 auto; height: 100vh; display: grid; grid-template-columns: 1fr; grid-template-rows: 0px 1fr 0px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navibar][footer],[data-is="app"][navibar][footer]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 20px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[navibar],[data-is="app"][navibar]{ grid-template-columns: 1fr; grid-template-rows: 40px 1fr 0px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app[footer],[data-is="app"][footer]{ grid-template-columns: 1fr; grid-template-rows: 0px 1fr 20px; grid-template-areas: \'navibar\' \'scrarea\' \'footer\'; overflow: hidden; } app navibar,[data-is="app"] navibar{ grid-area: navibar; padding: 5px; overflow: hidden; } app .scrarea,[data-is="app"] .scrarea{ grid-area: scrarea; padding: 0; overflow: auto; } app .footer,[data-is="app"] .footer{ grid-area: footer; padding: 2px 3px 2px 3px; overflow: hidden; }', '', function(opts) {
        let self = this;

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
                if (!Array.isArray(sobjs)) screenservice.screens.push(sobjs)
                else screenservice.screens.push(...sobjs)
            }
            setDefaultScreen();
        }
        let setDefaultScreen = () => {
            screenservice.showDefault();
        }
        let resetScreens = () => { screenservice.clear(); }
});

riot.tag2('language-menu', '<div class="menu"> <a ref="flags" class="flag-combo" href="javascript:;"> <span class="flag-css flag-icon flag-icon-{lang.current.flagId.toLowerCase()}" ref="css-icon"></span> <div class="flag-text">&nbsp;{lang.langId}&nbsp;</div> <span class="drop-synbol fas fa-caret-down"></span> </a> </div> <div ref="dropItems" class="language-dropbox"> <div each="{item in lang.languages}"> <a class="flag-item {(lang.langId === item.langId) ? \'selected\' : \'\'}" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="flag-css flag-icon flag-icon-{item.flagId.toLowerCase()}" ref="css-icon"></span> &nbsp; <div class="flag-text">{item.Description}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'language-menu,[data-is="language-menu"]{ margin: 0 auto; padding: 0, 2px; user-select: none; } language-menu .menu,[data-is="language-menu"] .menu{ margin: 0 auto; padding: 0; } language-menu a,[data-is="language-menu"] a{ margin: 0 auto; color: whitesmoke; } language-menu a:link,[data-is="language-menu"] a:link,language-menu a:visited,[data-is="language-menu"] a:visited{ text-decoration: none; } language-menu a:hover,[data-is="language-menu"] a:hover,language-menu a:active,[data-is="language-menu"] a:active{ color: yellow; text-decoration: none; } language-menu .flag-combo,[data-is="language-menu"] .flag-combo{ margin: 0 auto; } language-menu .flag-combo .flag-css,[data-is="language-menu"] .flag-combo .flag-css{ margin: 0px auto; padding-top: 1px; display: inline-block; } language-menu .flag-combo .flag-text,[data-is="language-menu"] .flag-combo .flag-text{ margin: 0 auto; display: inline-block; } language-menu .flag-combo .drop-symbol,[data-is="language-menu"] .flag-combo .drop-symbol{ margin: 0 auto; display: inline-block; } language-menu .flag-item,[data-is="language-menu"] .flag-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } language-menu .flag-item:hover,[data-is="language-menu"] .flag-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } language-menu .flag-item.selected,[data-is="language-menu"] .flag-item.selected{ background-color: darkorange; } language-menu .flag-item .flag-css,[data-is="language-menu"] .flag-item .flag-css{ margin: 0px auto; padding-top: 1px; width: 25px; display: inline-block; } language-menu .flag-item .flag-text,[data-is="language-menu"] .flag-item .flag-text{ margin: 0 auto; min-width: 80px; max-width: 120px; display: inline-block; } language-menu .language-dropbox,[data-is="language-menu"] .language-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } language-menu .language-dropbox.show,[data-is="language-menu"] .language-dropbox.show{ display: inline-block; z-index: 99999; }', '', function(opts) {
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
riot.tag2('links-menu', '<div class="menu"> <a ref="links" class="link-combo" href="javascript:;"> <span ref="showlinks" class="burger fas fa-bars"></span> </a> </div> <div ref="dropItems" class="links-dropbox"> <div each="{item in menus}"> <a class="link-item" href="javascript:;" onclick="{selectItem}"> &nbsp; <span class="link-css {item.icon}" ref="css-icon">&nbsp;</span> <div class="link-text">{item.text}</div> &nbsp;&nbsp;&nbsp; </a> </div> </div>', 'links-menu,[data-is="links-menu"]{ margin: 0 auto; padding: 0 3px; user-select: none; } links-menu .menu,[data-is="links-menu"] .menu{ margin: 0 auto; padding: 0; } links-menu a,[data-is="links-menu"] a{ margin: 0 auto; color: whitesmoke; } links-menu a:link,[data-is="links-menu"] a:link,links-menu a:visited,[data-is="links-menu"] a:visited{ text-decoration: none; } links-menu a:hover,[data-is="links-menu"] a:hover,links-menu a:active,[data-is="links-menu"] a:active{ color: yellow; text-decoration: none; } links-menu .link-combo,[data-is="links-menu"] .link-combo{ margin: 0 auto; } links-menu .link-item,[data-is="links-menu"] .link-item{ margin: 0px auto; padding: 2px; padding-left: 5px; height: 50px; display: flex; align-items: center; justify-content: center; } links-menu .link-item:hover,[data-is="links-menu"] .link-item:hover{ color: yellow; background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%); background-color:#77a809; cursor: pointer; } links-menu .link-item.selected,[data-is="links-menu"] .link-item.selected{ background-color: darkorange; } links-menu .link-item .link-css,[data-is="links-menu"] .link-item .link-css{ margin: 0px auto; width: 25px; display: inline-block; } links-menu .link-item .link-text,[data-is="links-menu"] .link-item .link-text{ margin: 0 auto; min-width: 80px; max-width: 120px; display: inline-block; } links-menu .links-dropbox,[data-is="links-menu"] .links-dropbox{ display: inline-block; position: fixed; margin: 0 auto; padding: 1px; top: 45px; right: 5px; background-color: #333; color:whitesmoke; max-height: calc(100vh - 50px - 20px); overflow: hidden; overflow-y: auto; display: none; } links-menu .links-dropbox.show,[data-is="links-menu"] .links-dropbox.show{ display: inline-block; z-index: 99999; }', '', function(opts) {
        let self = this;
        let links, dropItems;
        this.menus = [];

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
            links = self.refs['links'];
            dropItems = self.refs['dropItems'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            dropItems = null;
            links = null;
        });

        let onAppContentChanged = (e) => {
            self.menus = (screenservice.content) ? screenservice.content.links : [];
            self.update();
        }
        let onLanguageChanged = (e) => {
            self.menus = (screenservice.content) ? screenservice.content.links : [];
            self.update();
        }
        let onScreenChanged = (e) => {
            self.menus = (screenservice.content) ? screenservice.content.links : [];
            self.update();
        }
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

            let classList = ['.link-combo', '.burger'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }
        this.selectItem = (e) => {
            toggle();
            let selLink = e.item.item;
            if (selLink.type === 'screen') {
                screenservice.show(selLink.ref);
            }
            else {
                console.log('Not implements type, data:', selLink);
            }

            e.preventDefault();
            e.stopPropagation();
        }
});

riot.tag2('navibar', '<div class="banner"> <div class="title">My Choice Rater Web</div> </div> <language-menu></language-menu> <links-menu></links-menu>', 'navibar,[data-is="navibar"]{ width: 100vw; margin: 0 auto; display: grid; grid-template-columns: 1fr 90px 40px; grid-template-rows: 1fr; grid-template-areas: \'banner lang-menu links-menu\'; background: cornflowerblue; color: whitesmoke; user-select: none; } navibar .banner,[data-is="navibar"] .banner{ grid-area: banner; margin: 0; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar .banner .title,[data-is="navibar"] .banner .title{ margin: 0; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.2rem; } navibar language-menu,[data-is="navibar"] language-menu{ grid-area: lang-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; } navibar links-menu,[data-is="navibar"] links-menu{ grid-area: links-menu; margin: 0 auto; padding: 0 3px; display: flex; align-items: center; justify-content: stretch; }', '', function(opts) {
        let self = this;
});
riot.tag2('page-footer', '<p class="caption"> {(appcontent.current) ? appcontent.current.footer.label.status + \' : \' : \'Status : \'} </p> <p class="status" ref="l1"></p> <p class="copyright"> &nbsp;&copy; {(appcontent.current) ? appcontent.current.footer.label.copyright : \'EDL Co., Ltd.\'} &nbsp;&nbsp; </p>', 'page-footer,[data-is="page-footer"]{ margin: 0 auto; width: 100vw; display: grid; grid-template-columns: fit-content(50px) 1fr fit-content(150px); grid-template-rows: 1fr; grid-template-areas: \'caption status copyright\'; justify-items: stretch; align-items: stretch; font-size: 0.70em; font-weight: bold; background: darkorange; color: whitesmoke; } page-footer .caption,[data-is="page-footer"] .caption{ grid-area: caption; padding-left: 3px; user-select: none; } page-footer .status,[data-is="page-footer"] .status{ grid-area: status; user-select: none; } page-footer .copyright,[data-is="page-footer"] .copyright{ grid-area: copyright; user-select: none; }', '', function(opts) {


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
            self.update();
        }
        this.show = () => {
            hideOtherScreens();
            self.root.classList.add('show')
            self.update();
        }
});
riot.tag2('dual-screen', '<div class="auto-container"> <div ref="flipper" class="flipper"> <div class="viewer-block"> <div class="content"> <yield from="viewer"></yield> </div> </div> <div class="entry-block"> <div class="content"> <yield from="entry"></yield> </div> </div> </div> </div>', 'dual-screen,[data-is="dual-screen"]{ margin: 0; padding: 0; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; grid-template-areas: \'auto-container\'; overflow: hidden; } dual-screen .auto-container,[data-is="dual-screen"] .auto-container{ margin: 0; padding: 0; width: 100%; height: 100%; grid-area: auto-container; border: 1px solid #f1f1f1; } dual-screen .flipper,[data-is="dual-screen"] .flipper{ margin: 0; padding: 0; position: relative; } dual-screen .auto-container .flipper.toggle,[data-is="dual-screen"] .auto-container .flipper.toggle{ cursor: default; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block,dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ display: block; margin: 0; padding: 0; width: 100%; height: 100%; backface-visibility: hidden; } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ background-color: dimgray; color: white; } dual-screen .content,[data-is="dual-screen"] .content{ position: relative; display: block; } @media only screen and (max-width: 600px) { dual-screen .flipper,[data-is="dual-screen"] .flipper{ width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; } dual-screen .auto-container .flipper.toggle,[data-is="dual-screen"] .auto-container .flipper.toggle{ transform: rotateY(180deg); } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block,dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ position: absolute; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ transform: rotateY(0deg); } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ transform: rotateY(180deg); } } @media only screen and (min-width: 600px) and (max-width: 1600px) { dual-screen .flipper,[data-is="dual-screen"] .flipper{ display: grid; grid-template-columns: 1fr auto; grid-template-rows: 1fr; grid-template-areas: \'viewer entry\'; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block,dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ position: relative; } dual-screen .viewer-block,[data-is="dual-screen"] .viewer-block{ grid-area: viewer; } dual-screen .entry-block,[data-is="dual-screen"] .entry-block{ grid-area: entry; } }', '', function(opts) {
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
riot.tag2('ninput', '<input type="{opts.type}" name="{opts.name}" required=""> <label>{opts.title}</label>', 'ninput,[data-is="ninput"]{ margin: 0; padding: 0; font-size: 14px; display: inline-block; position: relative; height: auto; width: 100%; background: #fff; padding: 10px; box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2); } ninput input,[data-is="ninput"] input{ padding: 5px 0; margin-bottom: 5px; width: 100%; background-color: #fff; box-sizing: border-box; box-shadow: none; outline: none; border: none; font-size: 14px; box-shadow: 0 0 0px 1000px white inset; border-bottom: 2px solid #999; } ninput input:-webkit-autofill,[data-is="ninput"] input:-webkit-autofill,ninput input:-webkit-autofill:hover,[data-is="ninput"] input:-webkit-autofill:hover,ninput input:-webkit-autofill:focus,[data-is="ninput"] input:-webkit-autofill:focus{ font-size: 14px; transition: background-color 5000s ease-in-out 0s; } ninput label,[data-is="ninput"] label{ position: absolute; top: 15px; left: 14px; color: #999; transition: .2s; pointer-events: none; } ninput input:focus ~ label,[data-is="ninput"] input:focus ~ label,ninput input:-webkit-autofill ~ label,[data-is="ninput"] input:-webkit-autofill ~ label,ninput input:valid ~ label,[data-is="ninput"] input:valid ~ label{ top: -5px; left: 10px; color: #f7497d; font-weight: bold; } ninput input:focus,[data-is="ninput"] input:focus,ninput input:valid,[data-is="ninput"] input:valid{ border-bottom: 2px solid #f7497d; }', '', function(opts) {
});
riot.tag2('osd', '', 'osd,[data-is="osd"]{ margin: 0 auto; padding: 0; }', '', function(opts) {
});
riot.tag2('card-sample', '<dual-screen ref="flipper"> <yield to="viewer"> <div ref="view" class="view"> <div ref="grid" id="grid"></div> </div> </yield> <yield to="entry"> <div ref="entry" class="entry"> <div class="head"> <h1>John Doe</h1> <p>Architect & Engineer</p> <p>We love that guy</p> </div> <div class="input-ui"> <input type="text" value="" placeholder="enter some text"> <button ref="submit">Submit</button> </div> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>We love that guy</p> <p>Architect & Engineer</p> </div> </yield> </dual-screen>', 'card-sample,[data-is="card-sample"]{ margin: 0 auto; padding: 0; width: 100%; height: 100%; } card-sample .view,[data-is="card-sample"] .view,card-sample .entry,[data-is="card-sample"] .entry{ margin: 0; padding: 0; width: 100%; height: 100%; max-width: 100vh; max-height: calc(100vh - 63px); overflow: auto; } card-sample .head,[data-is="card-sample"] .head{ text-align: center; } card-sample .input-ui,[data-is="card-sample"] .input-ui{ margin: 0 auto; padding: 5px; width: auto; }', '', function(opts) {
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
                layout:"fitDataFill",
                columns: [
                    { title: "Name", field: "name" },

                    { title: "Age", field: "age" },
                    { title: "Favourite Color", field: "col" },
                    { title: "Date Of Birth", field: "dob", align: "center" }
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
riot.tag2('customer-entry', '', '', '', function(opts) {
});
riot.tag2('device-entry', '', '', '', function(opts) {
});
riot.tag2('member-entry', '', '', '', function(opts) {
});
riot.tag2('org-entry', '', '', '', function(opts) {
});
riot.tag2('user-entry', '', '', '', function(opts) {
});
riot.tag2('branch-grid', '', '', '', function(opts) {
});
riot.tag2('membertype-grid', '', '', '', function(opts) {
});