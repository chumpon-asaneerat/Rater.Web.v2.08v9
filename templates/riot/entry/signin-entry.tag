<signin-entry>
    <div class="content-area">
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div class="padtop"></div>
        <div ref="userSignIn" class="user-signin">
            <div class="group-header">
                <h4>{ content.title }</h4>
                <div class="padtop"></div>
            </div>
            <div class="group-body">
                <div class="padtop"></div>
                <div class="padtop"></div>
                <ninput ref="userName" title="{ content.label.userName }" type="text" name="userName"></ninput>
                <div class="padtop"></div>
                <ninput ref="passWord" title="{ content.label.passWord }" type="password" name="pwd"></ninput>
                <div class="padtop"></div>
                <button ref="submit">
                    <span class="fas fa-user">&nbsp;</span>
                    { content.label.submit }
                </button>
                <div class="padtop"></div>
                <div class="padtop"></div>
            </div>
        </div>
        <div ref="userSelection" class="user-selection hide">
            <div class="group-header">
                <h4>{ content.label.selectAccount }</h4>
                <div class="padtop"></div>
            </div>
            <div class="group-body">
                    <div class="padtop"></div>
                    <div class="padtop"></div>
                    <h1>SELECT USER 1</h1>
                    <h1>SELECT USER 2</h1>
                    <h1>SELECT USER 3</h1>
                    <div class="padtop"></div>
                    <button ref="cancel">
                        <span class="fa fa-user-times">&nbsp;</span>
                        Cancel
                    </button>
                    <div class="padtop"></div>
                    <div class="padtop"></div>
                </div>
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
        :scope .content-area .user-signin,
        :scope .content-area .user-selection {
            display: block;
            position: relative;
            margin: 0 auto;
            padding: 0;
        }
        :scope .content-area .user-signin.hide,
        :scope .content-area .user-selection.hide {
            display: none;
        }
        :scope .padtop, 
        :scope .content-area .padtop,
        :scope .content-area .user-signin .group-header .padtop,
        :scope .content-area .user-signin .group-body .padtop, 
        :scope .content-area .user-selection .group-header .padtop,
        :scope .content-area .user-selection .group-body .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
        :scope .content-area .user-signin .group-header,
        :scope .content-area .user-selection .group-header {
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
        :scope .content-area .user-signin .group-header h4,
        :scope .content-area .user-selection .group-header h4 {
            display: block;
            margin: 0 auto;
            padding: 0;
            text-align: center;
            color: whitesmoke;
            user-select: none;
        }
        :scope .content-area .user-signin .group-body,
        :scope .content-area .user-selection .group-body {
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

        :scope .content-area .user-signin .group-body button,
        :scope .content-area .user-selection .group-body button {
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
        let self = this;
        let defaultContent = {
            title: 'Sign In',
            label: {
                selectAccount: 'Please Select Account',
                userName: 'User Name (admin)',
                passWord: 'Password',
                submit: 'Sign In'
            }
        }
        this.content = defaultContent;

        let userSignIn, userSelection;
        let userName, passWord, submit, cancel;

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
            submit.addEventListener('click', onSubmit);
            cancel.addEventListener('click', onCancel);
        }
        let unbindEvents = () => {
            cancel.removeEventListener('click', onCancel);
            submit.removeEventListener('click', onSubmit);
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            userSignIn = self.refs['userSignIn'];
            userSelection = self.refs['userSelection'];
            userName = self.refs['userName'];
            passWord = self.refs['passWord'];
            submit = self.refs['submit'];
            cancel = self.refs['cancel'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            userName = null;
            passWord = null;
            submit = null;
            cancel = null;
            userSignIn = null;
            userSelection = null;
        });

        let onAppContentChanged = (e) => { 
            if (screenservice && screenservice.screenId === 'signin') {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }
        let onLanguageChanged = (e) => {
            if (screenservice && screenservice.screenId === 'signin') {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }
        let onScreenChanged = (e) => {
            if (e.detail.screenId === 'signin') {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
                showUserSignIn();
            }
            else {
                clearInputs();
            }
        }
        let onSubmit = (e) => {
            if (checkUserName() && checkPassword()) {
                //e.preventDefault();
                //e.stopPropagation();
                let data = {
                    "userName": userName.value(),
                    "passWord": passWord.value()
                }
                console.log(data);
                showUserSelection();
            }
        }
        let onCancel = (e) => {
            console.log('cancel user selection');
            showUserSignIn();
        }
        let clearInputs = () => {
            if (userName && passWord) {
                userName.clear();
                passWord.clear();
            }
        }
        let showUserSignIn = () => {
            if (userSignIn && userSelection) {
                userSignIn.classList.remove('hide');
                userSelection.classList.add('hide');
                userName.focus();
            }
        }
        let showUserSelection = () => {
            if (userSignIn && userSelection) {
                userSignIn.classList.add('hide');
                userSelection.classList.remove('hide');
            }
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
    </script>
</signin-entry>