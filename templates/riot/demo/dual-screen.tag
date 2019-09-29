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
            width: 100%;
            height: 100%;
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
        .auto-container .flipper.toggle { cursor: default; }
        .viewer-block, .entry-block {
            display: block;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }
        .entry-block {
            background-color: dimgray;
            color: white;
        }
        .content {
            position: relative;
            display: block;
        }
        @media only screen and (max-width: 600px) {
            /* for mobile small screen  */
            .flipper {
                width: 100%;
                height: 100%;
                transition: transform 0.5s;
                transform-style: preserve-3d;
            }
            .auto-container .flipper.toggle { transform: rotateY(180deg); }
            .viewer-block, .entry-block {
                position: absolute;
            }
            .viewer-block { transform: rotateY(0deg); }
            .entry-block { transform: rotateY(180deg); }
        }
        @media only screen and (min-width: 600px) and (max-width: 1600px) {
            /* for large screen  */
            .flipper {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-rows: 1fr;
                grid-template-areas: 
                    'viewer entry';
            }
            .viewer-block, .entry-block { 
                position: relative;
            }
            .viewer-block { grid-area: viewer; }
            .entry-block { grid-area: entry; }
        }
    </style>
    <script>
        let self = this;
        let flipper;

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            flipper = self.refs['flipper'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            flipper = null;
        });

        this.toggle = () => {
            flipper.classList.toggle('toggle');
        }
    </script>
</dual-screen>