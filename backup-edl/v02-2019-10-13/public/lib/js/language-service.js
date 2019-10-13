//#region LanguageService class

class LanguageService {
    constructor() {
        this.pref = new UserPerference();
        this.pref.load(); // load once.
        this.languages = null;
        this.langId = LanguageService.defaultId;
        this.current = LanguageService.defaultLang;
    }
    getLanguages() {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.languages = data.records;
            self.change(self.pref.langId); // set langId from preference.
        }
        XHR.get('/api/languages/search', { enable: true }, fn);
    }
    change(langId) {
        let newId = (langId) ? langId.toUpperCase() : LanguageService.defaultId;
        if (this.langId != newId) {
            this.langId = newId;
            let ids = this.languages.map(lang => lang.langId);
            let idx = ids.indexOf(newId);
            this.current = (idx === -1) ? LanguageService.defaultLang : this.languages[idx];
            // keep langid to storage.
            this.pref.langId = this.current.langId;
            this.pref.save();
            // Raise event.
            let evt = new CustomEvent('language:changed');
            document.dispatchEvent(evt);
        }
    }
    static get defaultId() { return 'EN' }
    static get defaultLang() { 
        return {
            Description: "English",
            Enabled: true,
            SortOrder: 1,
            flagId: "US",
            langId: "EN"
        } 
    }
}
; (function () {
    //console.log('Init language service...');
    window.lang = window.lang || new LanguageService();
    lang.getLanguages();
})();

//#endregion
