<member-manage>
    <flip-screen ref="flipper">
        <yield to="viewer">
            <member-view ref="viewer" class="view"></member-view>
        </yield>
        <yield to="entry">
            <member-editor ref="entry" class="entry"></member-editor>
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
            max-height: calc(100vh - 62px);
            overflow: auto;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'member';
        let entryId = 'member';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Title',
            label: {},
            links: []
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

        let flipper, view, entry;

        let initCtrls = () => {
            flipper = self.refs['flipper'];
            entry = self.refs['entry'];
        }
        let freeCtrls = () => {
            entry = null;
            flipper = null;
        }
        let clearInputs = () => { }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('entry:beginedit', onEntryBeginEdit);
            document.addEventListener('entry:endedit', onEntryEndEdit);
        }
        let unbindEvents = () => {
            document.removeEventListener('entry:endedit', onEntryEndEdit);
            document.removeEventListener('entry:beginedit', onEntryBeginEdit);
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
        }
        let onEntryBeginEdit = (e) => {
            //console.log('Begin Edit');
            if (flipper) {
                flipper.toggle();
                let item = e.detail.item;
                if (entry) entry.setup(item);
            }
            
        }
        let onEntryEndEdit = (e) => {
            //console.log('End Edit');
            if (flipper) {
                flipper.toggle();
            }
        }

        //#endregion
    </script>
</member-manage>