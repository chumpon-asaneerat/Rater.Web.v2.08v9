<app>
    <navibar></navibar>
    <div class="scrarea">
        <yield/>
    </div>
    <page-footer class="footer"></page-footer>
    <style>
        :scope {
            margin: 0 auto;            
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 0px 1fr 0px;
            grid-template-areas: 
                'navibar'
                'scrarea'
                'footer';
            overflow: hidden;
        }
        :scope[navibar][footer] {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr 20px;
            grid-template-areas:
                'navibar'
                'scrarea'
                'footer';
            overflow: hidden;
        }
        :scope[navibar] {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr 0px;
            grid-template-areas:
                'navibar'
                'scrarea'
                'footer';
            overflow: hidden;
        }
        :scope[footer] {
            grid-template-columns: 1fr;
            grid-template-rows: 0px 1fr 20px;
            grid-template-areas:
                'navibar'
                'scrarea'
                'footer';
            overflow: hidden;
        }
        navibar {
            grid-area: navibar;
            padding: 5px;
            overflow: hidden;
        }
        .scrarea {
            grid-area: scrarea;
            padding: 2px;
            overflow: auto;
        }
        .footer {
            grid-area: footer;
            padding: 2px 3px 2px 3px;
            overflow: hidden;
        }
    </style>
    <script>
        let self = this;
        this.screens = [];

        let bindEvents = () => { }
        let unbindEvents = () => { }

        this.on('mount', () => {
            // after mount.
            scanScreens();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            // after unmount.
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
    </script>
</app>
