<text-input>
    <span>{ opts.label }</span>
    <input ref="ctrl" type="text" value="{ opts.value }">
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            display: block;
        }
        span {
            margin: 0;
            display: block;
            font-size: 0.7rem;
            font-weight: bold;
            width: calc(100% - 4px);
        }
        input {
            margin: 0;
            display: block;
            width: calc(100% - 4px);
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

        this.on('mount', () => {
            // after mount.
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            // after unmount.
        });

        //#endregion
    </script>
</text-input>