//#region ScreenService class

class ScreenService {
    constructor() {
        this.screens = [];
        this.current = null;
        let self = this;
        let appContentChanged = (e) => {
            self.refresh();
        }
        document.addEventListener('app:content:changed', appContentChanged)
    }
    refresh() {
        if (this.current && this.content) {
            let scrcontent = this.content;
            document.title = scrcontent.title + ' - My Choice Rater Web v2.0.8 build s9 ';
        }
        else {
            document.title = 'My Choice Rater Web v2.0.8 build s9';
        }
        // raise event.
        let evt = new CustomEvent('apptitlechanged');
        document.dispatchEvent(evt);
    }
    clear() {
        this.screens = [];
        this.current = null;
    }
    get screenId() {
        return (this.current) ? this.current.opts.screenid : null;
    }
    showDefault() {
        if (this.screens.length > 0) {
            this.show(this.screens[0].opts.screenid);
        }
    }
    getScreen(screenId) {
        let ret = null;
        let map = this.screens.map(scr => scr.opts.screenid);
        let idx = map.indexOf(screenId);
        if (idx !== -1) {
            ret = this.screens[idx];
        }
        return ret;
    }
    show(screenId) {
        let scr = this.getScreen(screenId);
        if (scr) {
            this.current = scr;
            scr.show();
            this.refresh();
            // Raise event.
            let evt = new CustomEvent('app:screen:changed', { detail: { screenId: screenId } });
            document.dispatchEvent(evt);
        }
    }
    get content() {
        // get current screen content.
        let ret = null;
        let id = this.screenId;
        if (appcontent.current) {
            let maps = appcontent.current.screens.map(scr => scr.screenid)
            let idx = maps.indexOf(id)
            if (idx !== -1) {
                ret = appcontent.current.screens[idx]
            }
        }
        if (!ret) {
            //console.error('Not found, screen id:', id)
        }
        return ret;
    }
}

; (function () {
    window.screenservice = window.screenservice || new ScreenService();
})();

//#endregion