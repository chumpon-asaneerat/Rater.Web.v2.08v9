<nav-bar>
    <p>logo</p>
    <yield />
    <style>
        :scope {
            display: block;
            background: cornflowerblue;
            color: whitesmoke;
        }
        p {
            display: inline;
            padding: 2px;
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
</nav-bar>
