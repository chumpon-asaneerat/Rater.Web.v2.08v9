<screen>
    <yield/>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            display: none;
        }
        :scope.show { display: block; }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.app = null;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

        //#endregion

        //#region private methods

        let hideOtherScreens = () => {
            let screens = self.app.screens;
            screens.forEach(screen => { if (screen !== self) screen.hide(); })
        }

        //#endregion

        //#region public methods
        
        this.hide = () => {
            self.root.classList.remove('show')
            self.update();
        }

        this.show = () => {
            hideOtherScreens();
            self.root.classList.add('show')      
            self.update();
        }

        this.setapp = (app) => {
            if (!app) return self.app;
            self.app = app;
        }

        //#endregion
    </script>
    </script>
</screen>