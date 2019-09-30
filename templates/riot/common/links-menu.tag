<links-menu>
    <div class="menu">
        <a ref="links" class="link-combo" href="javascript:;">
            <span ref="showlinks" class="burger fas fa-bars"></span>
        </a>
    </div>
    <div ref="dropItems" class="links-dropbox">
        <div each={ item in menus }>
            <a class="link-item" href="javascript:;" onclick="{ selectItem }">
                &nbsp;
                <span class="link-css { item.icon }" ref="css-icon">&nbsp;</span>
                <div class="link-text">{ item.text }</div>
                &nbsp;&nbsp;&nbsp;
            </a>                
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0 3px;
            user-select: none;
        }
        .menu {
            margin: 0 auto;
            padding: 0;
        }
        a {
            margin: 0 auto;
            color: whitesmoke;
        }
        a:link, a:visited { text-decoration: none; }
        a:hover, a:active {
            color: yellow;
            text-decoration: none;
        }
        .link-combo {
            margin: 0 auto;
        }
        .link-item {
            margin: 0px auto;
            padding: 2px;
            padding-left: 5px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .link-item:hover {
            color: yellow;
            background:linear-gradient(to bottom, #0c5a24 5%, #35750a 100%);
            background-color:#77a809;
            cursor: pointer;
        }
        .link-item.selected {
            background-color: darkorange;
        }
        .link-item .link-css {
            margin: 0px auto;
            /* padding-top: 1px; */
            width: 25px;
            display: inline-block;
        }
        .link-item .link-text {
            margin: 0 auto;
            min-width: 80px;
            max-width: 120px;
            display: inline-block;
        }
        .links-dropbox {
            display: inline-block;
            position: fixed;
            margin: 0 auto;
            padding: 1px;
            top: 45px;
            right: 5px;
            background-color: #333;
            color:whitesmoke;
            max-height: calc(100vh - 50px - 20px);
            overflow: hidden;
            overflow-y: auto;
            display: none;
        }
        .links-dropbox.show {
            display: inline-block;
            z-index: 99999;
        }
    </style>
    <script>
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
            // Close the dropdown menu if the user clicks outside of it
            let classList = ['.link-combo', '.burger'];
            let match = isInClassList(e.target, classList);
            if (!match) {
                if (dropItems.classList.contains('show')) {
                    toggle();
                }
            }
        }
        this.selectItem = (e) => {
            toggle(); // toggle off
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
    </script>
</links-menu>
