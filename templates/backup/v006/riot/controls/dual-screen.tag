<dual-screen>
    <div class="auto-container">
        <div ref="flipper" class="flipper">
            <div class="viewer-block">
                <div class="content">
                    <yield from="viewer"/>
                </div>
            </div>
            <div class="entry-block">
                <div class="content">
                    <yield from="entry"/>
                </div>
            </div>
        </div>
    </div>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'auto-container';
            overflow: hidden;
        }
        .auto-container {
            margin: 0;
            padding: 0;
            /*
            width: 100vw;
            height: 100vh;
            */
            grid-area: auto-container;
            border: 1px solid #f1f1f1;
            /* Remove this if you don't want the 3D effect */
            /* perspective: 30000px; */
        }
        .flipper {
            margin: 0;
            padding: 0;
            position: relative;
        }
        .auto-container .flipper.toggle { cursor: auto; }
        .viewer-block {
            margin: 0;
            padding: 0;
            backface-visibility: hidden;
        }
        .entry-block {
            margin: 0;
            padding: 0;
            backface-visibility: hidden;

            background-color: dimgray;
            color: white;
        }
        .content {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            /*
            max-width: 100%;
            max-height: 100%;
            */
        }
        @media only screen and (max-width: 700px) {
            /* for mobile small screen  */
            .flipper {
                width: 100%;
                height: 100%;
                transition: transform 0.5s;
                transform-style: preserve-3d;
            }
            .auto-container .flipper.toggle { transform: rotateY(180deg); }
            .viewer-block {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .entry-block {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .viewer-block { transform: rotateY(0deg); }
            .entry-block { transform: rotateY(180deg); }
        }
        @media only screen and (min-width: 700px) and (max-width: 1600px) {
            /* for large screen  */
            .flipper {
                width: 100%;
                height: 100%;
                display: grid;
                grid-gap: 5px 5px;
                grid-template-columns: 3fr 2fr;
                grid-template-rows: 1fr;
                grid-template-areas: 
                    'viewer entry';
                /* align-content: stretch; */
            }
            .viewer-block { 
                grid-area: viewer;
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px solid blueviolet;
            }
            .entry-block { 
                grid-area: entry;
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px solid forestgreen;
            }
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let flipper;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {}

        //#endregion
        
        //#region events bind/unbind

        let bindEvents = () => {}
        let unbindEvents = () => {}

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

        //#region public methods

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }

        //#endregion
    </script>
</dual-screen>