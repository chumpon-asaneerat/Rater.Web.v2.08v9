<email-input>
    <span>&nbsp;{ opts.label }</span>
    <div class="h-seperator"></div>
    <input ref="ctrl" type="email" value="{ opts.value }" placeholder="{ opts.hint }">
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            display: block;
        }
        span {
            margin: 0;
            display: block;
            font-size: 14px;
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
            border: 1px solid royalblue !important;
        }
        .h-seperator { display:block; height: 3px; }
    </style>
    <script>
        //#region local variables

        let self = this;
        let ctrl;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            // after mount.
            ctrl = self.refs['ctrl'];
            if (self.opts.autofocus === "true") ctrl.focus();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            // after unmount.
            ctrl = null;
        });

        //#endregion

        //#region public method

        this.focus = () => { ctrl.focus(); }
        this.value = () => { return ctrl.value; }

        //#endregion
    </script>
</email-input>