<user-selection>
    <virtual each={ user in users }>
        <div class="account">
            <div class="label">{ opts.customername }</div>
            <div class="data">{ user.CustomerName }</div>
            <button onclick="{ onSignIn }">&nbsp;<span class="fas fa-sign-in-alt">&nbsp;</span></button>
        </div>
        <hr>
    </virtual>
    <style>
        :scope {
            display: block;
            margin: 0 auto;
            padding: 0;
        }
        :scope .account {
            margin: 0 auto;
            padding: 0;
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas: 
                'label button'
                'data button';
            overflow: hidden;
            overflow-y: auto;
        }
        :scope .account .label {
            grid-area: label;
            display: block;
            margin: 0 auto;
            padding: 0;
            font-weight: bold;
            color: navy;
            width: 100%;
        }
        :scope .account .data {
            grid-area: data;
            display: block;
            margin: 0 auto;
            padding: 0;
            font-weight: bold;
            color: forestgreen;
            width: 100%;
        }
        :scope .account button {
            grid-area: button;
            display: inline-block;
            margin: 0 auto;
            padding: 0;
            font-weight: bold;
            color: forestgreen;
            width: 100%;
        }
</style>
    <script>
        let self = this;
        //let btnSignIn;

        this.users = [];

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('userlistchanged', onUserListChanged);
            //btnSignIn.addEventListener('click', onSignIn);
        }
        let unbindEvents = () => {
            //btnSignIn.removeEventListener('click', onSignIn);
            document.removeEventListener('userlistchanged', onUserListChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
        }

        this.on('mount', () => {
            //btnSignIn = self.refs['btnSignIn'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            //btnSignIn = null;
        });
        let onAppContentChanged = (e) => { 
            if (screenservice && screenservice.screenId === 'signin') {
                self.users = (secure.content) ? secure.users : [];
                self.update();
            }
        }
        let onLanguageChanged = (e) => { 
            if (screenservice && screenservice.screenId === 'signin') {
                self.users = (screenservice.content) ? secure.users : [];
                self.update();
            }
        }
        let onUserListChanged = (e) => { 
            if (screenservice && screenservice.screenId === 'signin') {
                self.users = (secure.content) ? secure.users : [];
                self.update();
            }
        }
        this.onSignIn = (e) => {
            let acc = e.item.user;
            secure.signin(acc.customerId);
        }
    </script>
</user-selection>