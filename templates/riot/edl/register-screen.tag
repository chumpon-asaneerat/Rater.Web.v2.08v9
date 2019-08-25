<register-screen>
    <text-input label="User Name:" value="user"></text-input>
    <password-input label="Password:" value="1234"></password-input>
    <style>
        :scope {
            margin: 0 auto;
            display: block;
            width: 150px;
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
</register-screen>