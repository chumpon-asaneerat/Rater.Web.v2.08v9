<language-menu>
    <div class="menu">
        <a ref="flags" class="flag" href="#">
            <span class="flag-css flag-icon flag-icon-{ language.flagcode }" ref="css-icon"></span>
            &nbsp;
            <div class="flag-text">{ language.langId }</div>
            &nbsp;
            <span class="drop-synbol fas fa-caret-down"></span>
        </a>
    </div>
    <div ref="dropItems" class="toggle">
        <div each={ lang in languages }>
            <a class="flag-item { (language.langId === lang.langId) ? 'selected' : '' }" href="javascript:;" onclick="{ selectItem }">
                &nbsp;
                <span class="flag-css flag-icon flag-icon-{ lang.flagcode }" ref="css-icon"></span>
                &nbsp;
                <div class="flag-text">{ lang.text }</div>
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
        .flag {
            margin: 0 auto;
        }
        .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            display: inline-block;
        }
        .flag-text {
            margin: 0 auto;
            display: inline-block;
        }
        .flag-item {
            margin: 7px auto;
            padding: 2px;
            padding-left: 5px;
            display: flex;
            align-content: center;
        }
        .drop-symbol {
            margin: 0 auto;
            width: 20px;
            display: inline-block;
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
            width: 100px;
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
        this.language = { langId: 'EN', flagcode: 'us', text: 'English' };
        this.languages = [
            { langId: 'EN', flagcode: 'us', text: 'English' },
            { langId: 'TH', flagcode: 'th', text: 'ไทย' },
            { langId: 'JP', flagcode: 'jp', text: 'Japan' },
            { langId: 'CN', flagcode: 'cn', text: 'Chaina' },
            { langId: 'KH', flagcode: 'kh', text: 'Cambodia' },
            { langId: 'IN', flagcode: 'in', text: 'India' },
            { langId: 'IL', flagcode: 'il', text: 'Israel' },
            { langId: 'MY', flagcode: 'my', text: 'Malaysia' },
            { langId: 'TR', flagcode: 'tr', text: 'Turkey' },
            { langId: 'YE', flagcode: 'ye', text: 'Yemen' },
            { langId: 'KR', flagcode: 'kr', text: 'South Korea' }
        ]

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            flags.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            flags.addEventListener('click', toggle);
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

        let toggle = () => {
            dropItems.classList.toggle('show');
        }

        let changeLanguage = (langId) => {
            let ids = self.languages.map(lang => lang.langId)
            let idx = ids.indexOf(langId);
            self.language = (idx !== -1) ? self.languages[idx] : self.languages[0];
            self.update();
        }

        this.selectItem = (e) => {
            toggle(); // toggle off
            let lang = e.item.lang;
            changeLanguage(lang.langId);
            
            e.preventDefault();
            e.stopPropagation();
        }

        //#endregion

        //#region public methods

        //#endregion
    </script>
</language-menu>