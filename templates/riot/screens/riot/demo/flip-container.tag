<flip-container>
    <div class="auto-container">
        <div ref="flipper" class="flipper">
            <div class="viewer-div">
                <yield from="viewer"/>
            </div>
            <div class="entry-div">
                <yield from="entry"/>
            </div>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
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
            grid-area: auto-container;
            background-color: transparent;
            border: 1px solid #f1f1f1;
            /* Remove this if you don't want the 3D effect */
            /* perspective: 30000px; */
        }
        .flipper {
            position: relative;
            width: 100%;
            height: 100%;
            /* text-align: center; */
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        /*
        .auto-container:hover .flipper {
            transform: rotateY(180deg);
        }
        */
        .auto-container .flipper.toggle {
            transform: rotateY(180deg);
        }
        .viewer-div, .entry-div {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }
        .viewer-div {
            transform: rotateY(0deg);
        }
        .entry-div {
            background-color: dodgerblue;
            color: white;
            transform: rotateY(180deg);
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
</flip-container>