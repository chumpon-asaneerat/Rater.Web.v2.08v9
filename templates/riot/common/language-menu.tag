<language-menu>
    <div class="menu">
        <a ref="flags" class="flag-combo" href="javascript:;">
            <span class="flag-css flag-icon flag-icon-{ lang.current.flagId.toLowerCase() }" ref="css-icon"></span>
            &nbsp;
            <div class="flag-text">{ lang.langId }</div>
            &nbsp;
            <span class="drop-synbol fas fa-caret-down"></span>
        </a>
    </div>
    <div ref="dropItems" class="toggle">
        <div each={ item in lang.languages }>
            <a class="flag-item { (lang.langId === item.langId) ? 'selected' : '' }" href="javascript:;" onclick="{ selectItem }">
                &nbsp;
                <span class="flag-css flag-icon flag-icon-{ item.flagId.toLowerCase() }" ref="css-icon"></span>
                &nbsp;
                <div class="flag-text">{ item.Description }</div>
                &nbsp;&nbsp;&nbsp;
            </a>                
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0, 2px;
        }
        .menu {
            margin: 0 auto;
            padding: 0;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: 
                'flag';
            align-items: center;
            justify-content: stretch;
        }
        a {
            margin: 0 auto;
            color: whitesmoke;
        }
        a .flag-item {
            height: 30px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: 
                'flag';
            align-items: center;
            justify-content: stretch;
        }
        a:link, a:visited { text-decoration: none; }
        a:hover, a:active {
            color: yellow;
            text-decoration: none;
        }
        .flag-combo {
            margin: 0 auto;
        }
        .flag-combo .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            width: 20px;
            display: inline-block;
        }
        .flag-combo .flag-text {
            margin: 0 auto;
            display: inline-block;
            width: 25px;
        }
        .flag-combo .drop-symbol {
            margin: 0 auto;
            width: 10px;
            display: inline-block;
        }
        .flag-item {
            margin: 0px auto;
            padding: 2px;
            padding-left: 5px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .flag-item.selected {
            background-color: darkorange;
        }
        .flag-item .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            width: 25px;
            display: inline-block;
        }
        .flag-item .flag-text {
            margin: 0 auto;
            width: 120px;
            display: inline-block;
        }
        .toggle {
            display: inline-block;
            position: fixed;
            margin: 0 auto;
            padding: 1px;
            top: 45px;
            right: 5px;
            background-color: #333;
            color:whitesmoke;
            height: 150px;
            overflow: hidden;
            overflow-y: auto;
            display: none;
        }
        .toggle.show {
            display: inline-block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let flags, dropItems;

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            document.addEventListener('languagechanged', onLanguageChanged);
            flags.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            flags.removeEventListener('click', toggle);
            document.removeEventListener('languagechanged', onLanguageChanged);
        }

        //#endregion

        //#region riot handlers

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

        //#endregion

        //#region private methods

        let onLanguageChanged = (e) => { self.update(); }

        let toggle = () => {
            dropItems.classList.toggle('show');
            self.update();
        }

        this.selectItem = (e) => {
            toggle(); // toggle off
            let selLang = e.item.item;
            lang.change(selLang.langId);

            e.preventDefault();
            e.stopPropagation();
        }

        //#endregion
    </script>
</language-menu>