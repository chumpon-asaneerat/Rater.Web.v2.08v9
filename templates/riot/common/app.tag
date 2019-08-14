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
    <sidebar class="sidebar"></sidebar>
    <div class="scrarea">
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
                'sidebar scrarea'
                'footer  footer';
            overflow: hidden;
        }

        .navibar {
            grid-area: navibar;
            /*
            align-self: stretch;
            justify-self: stretch;
            */
        }
        .sidebar {
            grid-area: sidebar;
            overflow: auto;
        }
        .scrarea {
            grid-area: scrarea;
            overflow: auto;
        }
        .footer {
            grid-area: footer;
            padding: 0 2px;
            /*
            align-self: stretch;
            justify-self: stretch;
            */
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
            bindEvents();
            let sobjs = self.tags['screen'];            
            if (sobjs) {
                if (!Array.isArray(sobjs)) self.screens.push(sobjs)
                else self.screens.push(...sobjs)
            }
            self.screens.forEach((screen) => { screen.app(self); })

            if (self.screens && self.screens[0]) self.screens[0].show();
        });
        this.on('unmount', () => {
            unbindEvents();
            self.screens = []
        });

        //#endregion

        //#region local privete methods

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

        //#endregion
    </script>
</app>
