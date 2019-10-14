//#region ContentService class

class ContentService {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
            // raise event.
            let evt = new CustomEvent('app:content:changed');
            document.dispatchEvent(evt);
        }
        document.addEventListener('language:changed', contentChanged)
    }
    load(url, paramObj) {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
            // raise event.
            let evt = new CustomEvent('app:content:changed');
            document.dispatchEvent(evt);
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}
; (function () {
    //console.log('Init content service...');
    window.appcontent = window.appcontent || new ContentService();
    let href = window.location.href;
    if (href.endsWith('#')) href = window.location.href.replace('#', '');
    if (!href.endsWith('/')) href = href + '/';
    let url = href.replace('#', '') + 'contents';
    appcontent.load(url); // load contents.
})();

//#endregion
