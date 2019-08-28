<register-screen>
    <text-input ref="customerName" label="Customer Name:" value="" hint="Please enter customer name."></text-input>
    <email-input ref="userName" label="User Name:" value="" hint="Please enter user name (email)."></email-input>
    <password-input ref="passWord" label="Password:" value="" hint="Please enter password."></password-input>
    <icon-button ref="register" class="button" awesome="fas fa-save" text="register" href="javascript:;"></icon-button>
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
    <script>
        //#region local variables

        let self = this;
        let customerName, userName, passWord, register;

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            register.addEventListener('click', onRegister);
        }
        let unbindEvents = () => {
            register.removeEventListener('click', onRegister);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            // after mount.
            register = self.refs['register'].root;
            customerName = self.refs['customerName'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            // after unmount.
            passWord = null;
            userName = null;
            customerName = null;
            register = null;
        });

        //#endregion

        //#region private methods

        let onRegister = (e) => {
            if (checkCustomerName() && checkUserName() && checkPassword()) {
                console.log('all data ok.');
            }
        }

        let checkCustomerName = () => {
            let ret = false;            
            let val = customerName.value();
            ret = (val && val.length > 0);
            if (!ret) customerName.focus()
            return ret;
        }
        let checkUserName = () => {
            let ret = false;
            let val = userName.value();
            ret = (val && val.length > 0);
            if (!ret) userName.focus()
            return ret;
        }
        let checkPassword = () => {
            let ret = false;
            let val = passWord.value();
            ret = (val && val.length > 0);
            if (!ret) passWord.focus()
            return ret;
        }

        //#endregion
    </script>
</register-screen>