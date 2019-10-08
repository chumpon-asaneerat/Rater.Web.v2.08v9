<register-screen>
    <div class="header-space"></div>
    <text-input ref="customerName" label="{ label.customerName }" value="" hint="{ hint.customerName }" autofocus="true"></text-input>
    <email-input ref="userName" label="{ label.userName }" value="" hint="{ hint.userName }"></email-input>
    <password-input ref="passWord" label="{ label.password }" value="" hint="{ hint.password }"></password-input>
    <icon-button ref="register" class="button" awesome="fas fa-save" text="{ label.register }" href="javascript:;"></icon-button>
    <style>
        :scope {
            margin: 0 auto;
            margin-top: 5vh;
            padding: 5px;
            display: block;
            width: 90vw;
            height: 230px;
            max-width: 400px;
            color: white;
            border: 1px solid darkorange;
            border-radius: 5px;
            background: rgba(255, 140, 0, .8);
        }
        .button {
            margin: 0 auto;
            margin-top: 10px;
            padding: 5px;
            background: #69b9f3;
            font-size: 1rem;
            width: 96%;
            transform: translateX(2%);
        }
        .header-space {
            display: block;
            height: 5px;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let customerName, userName, passWord, register;
        let api = DbApi; // set reference to helper class.
        this.label = {
            "customerName": "Customer Name:",
            "userName": "User Name:",
            "password": "Password:",
            "register": "Register"
        };
        this.hint = {
            "customerName": "Please Enter Customer name.",
            "userName": "Please enter user name (email).",
            "password": "Please Enter password."
        };

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            register.addEventListener('click', onRegister);
            document.addEventListener('language:content:changed', onLanguageChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('language:content:changed', onLanguageChanged);
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

        let onLanguageChanged = (e) => {
            self.label = appcontent.current.screens.register.label;
            self.hint = appcontent.current.screens.register.hint;
            self.update();
        }

        let sendToServer = (data) => {
            let fn = (r) => {
                let ret = api.parse(r);
                if (ret.errors.hasError) {
                    console.log('has error:', ret.errors);
                }
                else {
                    // redirect to home
                    nlib.nav.gotoUrl('/');
                }
            }
            XHR.postJson('/api/customer/register', data, fn);
        }

        let onRegister = (e) => {
            if (checkCustomerName() && checkUserName() && checkPassword()) {
                let data = {
                    "customerName": customerName.value(),
                    "userName": userName.value(),
                    "passWord": passWord.value()
                }
                sendToServer(data);
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