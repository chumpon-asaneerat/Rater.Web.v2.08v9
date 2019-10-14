<rater-home>
    <h1>Rater Web Home</h1>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'home';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Rater Web Home',
            label: {
                screenTitle: 'Rater Web Home'
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

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('app:screen:changed', onScreenChanged);
            document.removeEventListener('language:changed', onLanguageChanged);
            document.removeEventListener('app:content:changed', onAppContentChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            bindEvents();
            initCtrls();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion

        //#region dom event handlers

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion

        //#region private methods

        //#endregion
    </script>
</rater-home>