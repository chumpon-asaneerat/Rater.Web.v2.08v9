<links-menu>
    <a ref="burger" href="#" class="toggle show">
        <span ref="showlinks" class="burger fas fa-bars"></span>
    </a>
    <a ref="close" href="#" class="toggle">
        <span ref="hidelinks" class="burger fas fa-times"></span>
    </a>
    <yield/>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        :scope.dropdown {
            margin: 0 auto;
        }
        .toggle {
            display: none;
        }
        .toggle.show {
            display: inline-block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region local element methods

        let bindEvents = () => {}
        let unbindEvents = () => {}

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });

        //#endregion

        //#region private methods

        //#endregion

        //#region public methods

        //#endregion
    </script>
</links-menu>
