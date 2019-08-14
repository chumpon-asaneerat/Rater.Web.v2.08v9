<screen>
    <yield/>
    <style>
        :scope {
            margin: 0 auto;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region public methods

        //this.publicMethod = (message) => { }

        //#endregion
    </script>
</screen>