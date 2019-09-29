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
        let self = this;

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
                if (!Array.isArray(sobjs)) screenservice.screens.push(sobjs)
                else screenservice.screens.push(...sobjs)
            }
            setDefaultScreen();
        }
        let setDefaultScreen = () => {
            screenservice.showDefault();
        }
        let resetScreens = () => { screenservice.clear(); }
    </script>
</app>
