<register-screen>
    <style>
        :scope {
            margin: 0 auto;
            margin-top: 10%;
            display: block;
            width: 250px;
        }
        .button {
            margin: 0 auto;
            margin-top: 5px;
            background: #69b9f3;
            font-size: 1rem;
            width: 100%;
        }
    </style>
    <text-input label="Customer Name:" value="" hint="Please enter customer name."></text-input>
    <email-input label="User Name:" value="" hint="Please enter user name (email)."></email-input>
    <password-input label="Password:" value="" hint="Please enter password."></password-input>
    <icon-button class="button" awesome="fas fa-save" text="register" href="javascript:;"></icon-button>
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