<flip-screen>
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
            grid-area: auto-container;
            border: 1px solid #f1f1f1;
            /* Remove this if you don't want the 3D effect */
            /* perspective: 30000px; */
        }
        .flipper {
            margin: 0;
            padding: 0;
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.5s;
            transform-style: preserve-3d;
        }
        .auto-container .flipper.toggle {
            transform: rotateY(180deg);
        }
        .viewer-block {
            position: absolute;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform: rotateY(0deg);
        }
        .entry-block {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform: rotateY(180deg);

            background-color: dimgray;
            color: white;
        }
        .content {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
        }
    </style>
    <script></script>
</flip-screen>