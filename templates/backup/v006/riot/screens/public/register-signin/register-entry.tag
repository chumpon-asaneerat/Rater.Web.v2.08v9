<register-entry>
    <div class="content-area">
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="group-header">
            <h4><span class="fas fa-save">&nbsp;</span>&nbsp;{ content.title }</h4>
            <div class="padtop"></div>
        </div>
        <div class="group-body">
            <div class="padtop"></div>
            <div class="padtop"></div>
            <ninput ref="customerName" title="{ content.label.customerName }" type="text" name="customerName"></ninput>
            <div class="padtop"></div>
            <ninput ref="userName" title="{ content.label.userName }" type="text" name="userName"></ninput>
            <div class="padtop"></div>
            <ninput ref="passWord" title="{ content.label.passWord }" type="password" name="pwd"></ninput>
            <div class="padtop"></div>
            <button ref="submit">
                <span class="fas fa-save">&nbsp;</span>
                { content.label.submit }
            </button>
            <div class="padtop"></div>
            <div class="padtop"></div>
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 2px;
            position: relative;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'content-area';
            overflow: hidden;
            /* background-color: whitesmoke; */
        }
        :scope .content-area {
            grid-area: content-area;
            margin: 0 auto;
            padding: 0px;
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            background-color: white;
            /*
            background-image: linear-gradient(0deg, silver, silver), url('public/assets/images/backgrounds/bg-08.jpg');
            */
            background-image: url('public/assets/images/backgrounds/bg-08.jpg');
            background-blend-mode: multiply, luminosity;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        :scope .padtop, 
        :scope .content-area .padtop,
        :scope .content-area .group-header .padtop,
        :scope .content-area .group-body .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
        :scope .content-area .group-header {
            display: block;
            margin: 0 auto;
            padding: 3px;
            width: 30%;
            min-width: 300px;
            max-width: 500px;
            opacity: 0.8;
            background-color: cornflowerblue;            
            border: 1px solid dimgray;
            border-radius: 8px 8px 0 0;
        }
        :scope .content-area .group-header h4 {
            display: block;
            margin: 0 auto;
            padding: 0;
            padding-top: 5px;
            font-size: 1.1rem;
            text-align: center;
            color: whitesmoke;
            user-select: none;
        }
        :scope .content-area .group-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            padding: 0;
            height: auto;
            width: 30%;
            min-width: 300px;
            max-width: 500px;
            opacity: 0.8;
            background: white;
            border: 1px solid dimgray;
            border-radius: 0 0 8px 8px;
        }

        :scope .content-area .group-body button {
            display: inline-block;
            margin: 5px auto;
            padding: 10px 15px;
            color: forestgreen;
            font-weight: bold;
            cursor: pointer;
            width: 45%;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'register';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Register',
            label: {
                customerName: 'Customer Name',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Reister'
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let customerName, userName, passWord, submit;

        let initCtrls = () => {
            customerName = self.refs['customerName'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
        }
        let freeCtrls = () => {
            customerName = null;
            userName = null;
            passWord = null;
            submit = null;
        }
        let clearInputs = () => {
            if (customerName && userName && passWord) {
                customerName.clear();
                userName.clear();
                passWord.clear();
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

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('registersuccess', onRegisterSuccess);
            document.addEventListener('registerfailed', onRegisterFailed);
            submit.addEventListener('click', onSubmit);
        }
        let unbindEvents = () => {
            submit.removeEventListener('click', onSubmit);
            document.addEventListener('registerfailed', onRegisterFailed);
            document.addEventListener('registersuccess', onRegisterSuccess);
            document.removeEventListener('app:screen:changed', onScreenChanged);
            document.removeEventListener('language:changed', onLanguageChanged);
            document.removeEventListener('app:content:changed', onAppContentChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion

        //#region dom event handlers

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {
                customerName.focus();
            }
            else {
                clearInputs();
            }
        }
        
        let onRegisterSuccess = (e) => {
            screenservice.showDefault();
            clearInputs();
        }
        let onRegisterFailed = (e) => {
            let err = { msg: 'register failed.' }
            showMsg(err);
        }
        let onSubmit = (e) => {
            if (checkCustomerName() && checkUserName() && checkPassword()) {
                //e.preventDefault();
                //e.stopPropagation();
                let data = {
                    customerName: customerName.value(),
                    userName: userName.value(),
                    passWord: passWord.value(),
                    licenseTypeId: 0
                }
                secure.register(data.customerName, data.userName, data.passWord, data.licenseTypeId);
            }
        }

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => {
            logger.info(err);
        }

        //#endregion

        //#region private methods

        //#endregion
    </script>
</register-entry>