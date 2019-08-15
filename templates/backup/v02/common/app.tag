<app>
    <!--
    <p>this is generate by riot v3.x. id: '{ opts.id }', text: '{ opts.text }'</p>
    <p>loca data: { lang.id } and { lang.text } </p>
    <button ref="change-button">Change</button>
    <button ref="call-button">Callme</button>    
    <button onclick="{ show }" value="0">show1</button>
    <button onclick="{ show }" value="1">show2</button>
    <button onclick="{ show }" value="2">show3</button>
    -->
    <nav-bar class="navibar"></nav-bar>    
    <div class="scrarea">
        <sidebar class="sidebar"></sidebar>
        <yield/>
    </div>
    <page-footer class="footer"></page-footer>
    <style>
        :scope {
            margin: 0 auto;
            height: 100vh;
            display: grid;
            grid-template-columns: 200px 1fr;
            grid-template-rows: 40px 1fr 20px;
            grid-template-areas: 
                'navibar navibar'
                'scrarea scrarea'
                'footer  footer';
            overflow: hidden;
        }

        .navibar { grid-area: navibar; }
        .sidebar {
            grid-area: sidebar;
            overflow: auto;
            display: none;
        }
        .sidebar.open {
            display: block;
        }
        .scrarea {
            grid-area: scrarea;
            overflow: auto;
        }
        .footer {
            grid-area: footer;
            padding: 0 2px;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.screens = [];
        this.sidebar = null;
        this.navbar = null;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion
        
        //#region riot handlers

        this.on('mount', () => {
            // after mount.
            scanScreens();
            // set navbar and sidebar.
            self.navbar = self.tags['nav-bar'];
            self.navbar.setapp(self);
            self.sidebar = self.tags['sidebar'];
            self.sidebar.setapp(self);
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            // after unmount.
            resetScreens();
            // reset navbar and sidebar.
            self.navbar = null;
            self.sidebar = null;
        });

        //#endregion

        //#region local privete methods

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
        /*
        this.show = (e) => {
            //console.log(e.target.value)
            let id = e.target.value;
            let screen = self.screen(id);
            if (screen) screen.show();
        }
        */

        //#endregion

        //#region public methods

        this.screen = (id) => {
            let ret = null;
            if (id >= 0 && id < self.screens.length) {
                ret = self.screens[id];
            }
            return ret;
        }

        this.showSideBar = () => {
            if (self.sidebar) self.sidebar.show();
        }

        this.hideSideBar = () => {
            if (self.sidebar) self.sidebar.hide();
        }

        this.toggleSideBar = () => {
            if (self.sidebar) self.sidebar.toggle();
        }

        //#endregion
    </script>
</app>
