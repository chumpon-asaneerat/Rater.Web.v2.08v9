<dev-sample>
    <flip-screen ref="flipper">
        <yield to="viewer">
            <dev-sample-grid ref="viewer" class="view"></dev-sample-grid>
        </yield>
        <yield to="entry">
            <dev-sample-editor ref="entry" class="entry"></dev-sample-editor>
        </yield>
    </flip-screen>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .view, .entry {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            /* max-width: 100%; */
            max-height: calc(100vh - 64px);
            overflow: auto;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let current;

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
        }
        this.content = defaultContent;

        let updatecontent = () => {
            /*
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
            */
            self.update();
        }

        //#endregion

        //#region controls variables and methods

        let flipper, view, entry;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => { }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
            document.addEventListener('sample:beginedit', onSampleBeginEdit);
            document.addEventListener('sample:endedit', onSampleEndEdit);
        }
        let unbindEvents = () => {
            document.removeEventListener('sample:endedit', onSampleEndEdit);
            document.removeEventListener('sample:beginedit', onSampleBeginEdit);
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
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
        }
        let onSampleBeginEdit = (e) => {
            console.log('Begin Edit');
            flipper.toggle();
        }
        let onSampleEndEdit = (e) => {
            console.log('End Edit');
            flipper.toggle();
        }

        //#endregion

    </script>
</dev-sample>