<dev-sample-editor>
    <h3>{ (current) ? current.name : '-' }</h3>
    <button ref="cmdSave">Save</button>
    <button ref="cmdCancel">Cancel</button>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'screenid';
        this.current;

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

        let cmdSave, cmdCancel;

        let initCtrls = () => {
            cmdSave = self.refs['cmdSave'];
            cmdCancel = self.refs['cmdCancel'];
        }
        let freeCtrls = () => {
            cmdCancel = null;
            cmdSave = null;
        }
        let clearInputs = () => {}

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:content:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('sample:beginedit', onSampleBeginEdit)
            cmdSave.addEventListener('click', onSave)
            cmdCancel.addEventListener('click', onCancel)
        }
        let unbindEvents = () => {
            cmdCancel.removeEventListener('click', onCancel)
            cmdSave.removeEventListener('click', onSave)
            document.removeEventListener('sample:beginedit', onSampleBeginEdit)
            document.removeEventListener('app:screen:changed', onScreenChanged);
            document.removeEventListener('language:content:changed', onLanguageChanged);
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
                // screen shown.
            }
            else {
                // other screen shown.
            }
        }
        let onSampleBeginEdit = (e) => {
            let data = e.detail.item;
            self.current = data;
            console.log(self.current)
            updatecontent();
        }

        //#endregion

        onSave = (e) => {
            self.current.name = 'change name';
            let data = { item: self.current, isChanged: true }
            evt = new CustomEvent('sample:endedit', { detail: data })
            document.dispatchEvent(evt);
        }
        onCancel = (e) => {
            let data = { item: self.current, isChanged: false }
            evt = new CustomEvent('sample:endedit', { detail: data })
            document.dispatchEvent(evt);
        }

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion
    </script>
</dev-sample-editor>