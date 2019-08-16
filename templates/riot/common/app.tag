<app>
    <scrarea class="scrarea">
        <yield/>
    </scrarea>
    <style>
        :scope {
            margin: 0 auto;
            height: 100vh;
            width: 100vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'scrarea';
            overflow: hidden;
        }
        .scrarea {
            grid-area: scrarea;
            overflow: auto;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.screens = [];

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion
        
        //#region riot handlers

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

        //#endregion

        //#region privete methods

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

        //#endregion

        //#region public methods

        this.screen = (id) => {
            let ret = null;
            if (id >= 0 && id < self.screens.length) {
                ret = self.screens[id];
            }
            return ret;
        }

        //#endregion
    </script>
</app>
