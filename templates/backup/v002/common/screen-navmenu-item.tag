<screen-navmenu-item>
    <div class="home-icon">
        <a href="#">
            <span class="fas fa-home"></span>
        </a>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0, 2px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: 
                'home-icon';
            align-items: center;
            justify-content: stretch;
        }
        .home-icon {
            grid-area: home-icon;
            color: whitesmoke;
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
    </style>
    <script>
        //#region local variables

        let self = this;
        this.app = null;

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            self.root.addEventListener('click', toggleSideBar)
        }
        let unbindEvents = () => {
            self.root.removeEventListener('click', toggleSideBar)
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        let showSideBar = () => {
            self.app.showSideBar();
        }        
        let hideSideBar = () => {
            self.app.hideSideBar();
        }
        let toggleSideBar = () => {
            self.app.toggleSideBar();
        }

        //#endregion

        //#region public methods

        this.setapp = (app) => {
            if (!app) return self.app;
            self.app = app;
        }

        //#endregion
    </script>
</screen-navmenu-item>