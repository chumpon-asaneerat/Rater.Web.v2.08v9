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
            padding: 0;
            overflow: auto;
        }
        .footer {
            grid-area: footer;
            padding: 2px 3px 2px 3px;
            overflow: hidden;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {
            let sobjs = self.tags['screen'];
            if (sobjs) {
                if (!Array.isArray(sobjs)) screenservice.screens.push(sobjs)
                else screenservice.screens.push(...sobjs)
            }
            screenservice.showDefault();
        }
        let freeCtrls = () => {
            screenservice.clear();
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion
    </script>
</app>
