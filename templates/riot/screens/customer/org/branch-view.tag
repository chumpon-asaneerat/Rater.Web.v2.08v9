<branch-view>
    <div ref="title" class="titlearea">{ content.title }</div>
    <div ref="container" class="scrarea">
        <div ref="grid" id="grid"></div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 30px 1fr;
            grid-template-areas: 
                'titlearea'
                'scrarea';
        }
        .titlearea {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .scrarea {
            
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'screenid';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Branch Management',
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

        let initCtrls = () => {}
        let freeCtrls = () => {}
        let clearInputs = () => {}

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:content:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
        }
        let unbindEvents = () => {
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

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion

        //#region public methods

        this.publicMethod = (message) => { }

        //#endregion
    </script>
</branch-view>