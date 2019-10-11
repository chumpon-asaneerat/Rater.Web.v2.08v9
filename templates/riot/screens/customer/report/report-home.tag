<report-home>    
    <div class="report-container">
        <div ref="home" class="report-screen" screen="home">
            <label></label>
        </div>
        <div ref="rawvoteSearch" class="report-screen hide" screen="rawvote-search">
        </div>
        <div ref="rawvoteResult" class="report-screen hide" screen="rawvote-result">
        </div>
        <div ref="votesummarySearch" class="report-screen hide" screen="votesummary-search">
        </div>
        <div ref="votesummaryResult" class="report-screen hide" screen="votesummary-result">
        </div>
        <div ref="staffrawSearch" class="report-screen hide" screen="staffperf-search">
        </div>
        <div ref="staffrawResult" class="report-screen hide" screen="staffperf-result">
        </div>
        <div ref="staffperfSearch" class="report-screen hide" screen="staffperf-search">
        </div>
        <div ref="staffperfResult" class="report-screen hide" screen="staffperf-result">
        </div>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'report-container';
        }
        :scope .report-container {
            grid-area: report-container;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .report-container .report-screen {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: block;
        }
        :scope .report-container .report-screen.hide {
            display: none;
        }
        :scope .report-container .report-screen[screen="home"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen[screen="rawvote-search"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen[screen="rawvote-result"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen [screen="votesummary-search"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen [screen="votesummary-result"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen [screen="staffperf-search"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
        :scope .report-container .report-screen [screen="staffperf-result"] {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }        
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'report';

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
</report-home>