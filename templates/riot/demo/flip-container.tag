<flip-container>
    <div class="flip-container">
        <div ref="flipper" class="flipper">
            <div class="front">
                <!--
                <img src="public/assets/images/png/books/book1.png" alt="Avatar" style="width: 100%; height:auto;">
                -->
                <yield from="front"/>
            </div>
            <div class="back">
                <!--
                <h1>John Doe</h1>
                <p>Architect & Engineer</p>
                <p>We love that guy</p>
                -->
                <yield from="back"/>
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
                'flip-container';
            overflow: hidden;
        }
        .flip-container {
            grid-area: flip-container;
            background-color: transparent;
            border: 1px solid #f1f1f1;
            /* Remove this if you don't want the 3D effect */
            /* perspective: 30000px; */
        }
        .flipper {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        /*
        .flip-container:hover .flipper {
            transform: rotateY(180deg);
        }
        */
        .flip-container .flipper.toggle {
            transform: rotateY(180deg);
        }
        .front, .back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }
        .front {
            transform: rotateY(0deg);
        }
        .back {
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