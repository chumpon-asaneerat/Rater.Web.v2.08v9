<screen active="{ opts.active ? true : false }">
    <yield/>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            display: none;
        }
        :scope[active=true] { display: block; }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.opts.active = false;
        this.app = null;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        let hideOtherScreens = () => {
            let screens = self.app.screens;
            screens.forEach(screen => { if (screen !== self) screen.hide(); })
        }

        //#endregion

        //#region public methods
        
        this.hide = () => {
            self.opts.active = false;
            self.update();
        }

        this.show = () => {
            hideOtherScreens();
            self.opts.active = true;            
            self.update();
        }

        this.app = (app) => {
            if (!app) return self.app;
            self.app = app;
        }

        //#endregion
    </script>
</screen>