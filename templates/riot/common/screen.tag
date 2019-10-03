<screen>
    <div class="content-area">
        <yield/>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            display: none;
            width: 100%;
            height: 100%;
        }
        :scope.show { 
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'content-area';
        }
        .content-area {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region content variables and methods

        let updatecontent = () => { self.update(); }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        let hideOtherScreens = () => {
            let screens = screenservice.screens;
            if (screens) {
                screens.forEach(screen => { if (screen !== self) screen.hide(); })
            }
        }

        //#endregion

        //#region public methods

        this.hide = () => {
            self.root.classList.remove('show')
            updatecontent();
        }
        this.show = () => {
            hideOtherScreens();
            self.root.classList.add('show');            
            updatecontent();
        }

        //#endregion
    </script>
    </script>
</screen>