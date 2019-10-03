<osd>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {}
        let freeCtrls = () => {}
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

        //#region dom event handlers

        //#endregion

        //#region public methods

        //#endregion
    </script>
</osd>