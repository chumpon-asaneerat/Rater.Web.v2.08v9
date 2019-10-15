<report-home>    
    <div class="report-container">
        <div ref="home" class="report-screen" screen="home">
            <report-menu ref="report-menu"></report-menu>
        </div>
        <div ref="rawvoteSearch" class="report-screen hide" screen="rawvote-search">
            <raw-vote-search ref="rws"></raw-vote-search>
        </div>
        <div ref="rawvoteResult" class="report-screen hide" screen="rawvote-result">
            <label>rawvoteResult</label>
        </div>
        <div ref="votesummarySearch" class="report-screen hide" screen="votesummary-search">
            <label>votesummarySearch</label>
        </div>
        <div ref="votesummaryResult" class="report-screen hide" screen="votesummary-result">
            <label>votesummaryResult</label>
        </div>
        <div ref="staffrawSearch" class="report-screen hide" screen="staffperf-search">
            <label>staffrawSearch</label>
        </div>
        <div ref="staffrawResult" class="report-screen hide" screen="staffperf-result">
            <label>staffrawResult</label>
        </div>
        <div ref="staffperfSearch" class="report-screen hide" screen="staffperf-search">
            <label>staffperfSearch</label>
        </div>
        <div ref="staffperfResult" class="report-screen hide" screen="staffperf-result">
            <label>staffperfSearch</label>
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

        let home;
        let rawvoteSearch, rawvoteResult;
        let votesummarySearch, votesummaryResult;
        let staffrawSearch, staffrawResult;
        let staffperfSearch, staffperfResult;

        let reportMenu, rws;

        let initCtrls = () => {
            home = self.refs['home']
            rawvoteSearch = self.refs['rawvoteSearch']
            rawvoteResult = self.refs['rawvoteResult']
            votesummarySearch = self.refs['votesummarySearch']
            votesummaryResult = self.refs['votesummaryResult']
            staffrawSearch = self.refs['staffrawSearch']
            staffrawResult = self.refs['staffrawResult']
            staffperfSearch = self.refs['staffperfSearch']
            staffperfResult = self.refs['staffperfResult']

            reportMenu = self.refs['report-menu']
            reportMenu.setup(self)
            rws = self.refs['rws']
            rws.setup(self)
        }
        let freeCtrls = () => {
            home = null
            rawvoteSearch = null
            rawvoteResult = null
            votesummarySearch = null
            votesummaryResult = null
            staffrawSearch = null
            staffrawResult = null
            staffperfSearch = null
            staffperfResult = null

            reportMenu = null;
            rws = null;
        }
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

        //#region private method

        let hideElm = (el) => {
            if (el) el.classList.add('hide');
        }
        let showElm = (el) => {
            hideAll();
            if (el) el.classList.remove('hide');
        }
        let hideAll = () => {
            hideElm(home)
            hideElm(rawvoteSearch)
            hideElm(rawvoteResult)
            hideElm(votesummarySearch)
            hideElm(votesummaryResult)
            hideElm(staffrawSearch)
            hideElm(staffrawResult)
            hideElm(staffperfSearch)
            hideElm(staffperfResult)
        }
        this.showRawVoterSearch = () => {
            //console.log('click.')
            showElm(rawvoteSearch)
            if (rws) rws.refresh()
        }

        this.showHome = () => {
            //console.log('click.')
            showElm(home)
            home.refresh()
        }

        //#endregion

        //#region public methods

        this.publicMethod = (message) => { }

        //#endregion
    </script>
</report-home>