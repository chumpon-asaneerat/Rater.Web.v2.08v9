<password-input>
    <span>{ opts.label }</span>
    <input ref="ctrl" type="password" value="{ opts.value }" placeholder="{ opts.hint }">
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            display: block;
        }
        span {
            margin: 0;
            display: block;
            font-weight: bold;
            font-size: 0.7rem;
            width: 100%;
        }
        input {
            margin: 0;
            padding: 0 2px;
            display: block;
            width: 100%;
            border: 1px solid silver;
            border-radius: 4px;
            outline: none;
            box-shadow: none;
        }
        input:focus {
            border: 1px solid green !important;
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
</password-input>