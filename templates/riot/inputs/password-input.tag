<password-input>
    <span>{ opts.label }</span>
    <div class="border">
        <input ref="ctrl" type="password" value="{ opts.value }" placeholder="{ opts.hint }">
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            display: block;
        }
        .border {
            margin: 0 auto;
            padding: 1px;
            display: block;            
            border: 1px solid silver;
            border-radius: 4px;
        }
        span {
            margin: 0;
            display: block;
            font-size: 0.7rem;
            font-weight: bold;
            width: 100%;
        }
        input {
            margin: 0;
            display: block;
            font-size: 0.9rem;
            width: 100%;
            border: 1px solid transparent;
        }
        input:focus {
            padding: 0;
            border: 1px solid green !important;
            box-shadow: 0 0 1px green !important;
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