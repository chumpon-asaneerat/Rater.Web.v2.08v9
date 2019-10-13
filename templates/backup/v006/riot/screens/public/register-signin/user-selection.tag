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
        //#region local variables

        let self = this;
        let screenId = 'signin';

        //#endregion

        //#region content variables and methods

        this.users = [];

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.users = (secure.content) ? secure.users : [];
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('userlistchanged', onUserListChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('userlistchanged', onUserListChanged);
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
        let onUserListChanged = (e) => { updatecontent(); }

        //#endregion
        
        //#region local inline event handlers

        this.onSignIn = (e) => {
            let acc = e.item.user;
            secure.signin(acc.customerId);
        }

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion
    </script>
</user-selection>