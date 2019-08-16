<language-menu>
    <div>
        <a class="flag" href="#">
            <span class="flag-css flag-icon flag-icon-{ flagcode }" ref="css-icon"></span>
            &nbsp;
            <div class="flag-text">EN</div>
            &nbsp;
            <span class="drop-synbol fas fa-caret-down"></span>
        </a>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0, 2px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: 
                'flag';
            align-items: center;
            justify-content: stretch;
        }
        a {
            margin: 0 auto;
            color: whitesmoke;
        }
        a:link, a:visited { text-decoration: none; }
        a:hover, a:active {
            color: yellow;
            text-decoration: none;
        }
        .flag {
            margin: 0 auto;
            /*
            display: flex;
            align-items: center;
            justify-content: stretch;
            */
        }
        .flag-css {
            margin: 0px auto;
            padding-top: 1px;
            display: inline-block;
        }
        .flag-text {
            margin: 0 auto;
            display: inline-block;
        }
        .drop-symbol {
            margin: 0 auto;
            display: inline-block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.flagcode = 'us'

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
</language-menu>