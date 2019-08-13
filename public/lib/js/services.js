//#region LocalStorage class

class LocalStorage {
    constructor() {
        this._name = ''
        this._data = null
        this._ttl = 0;
    };

    //-- public methods.
    checkExist() {
        if (!this.data) {
            this.data = this.getDefault();
            this.save();
        }
    };

    getDefault() {
        return {}
    };

    save() {
        if (!this._name) return; // no name specificed.
        let ttl = (this._ttl) ? this._ttl : 0;
        nlib.storage.set(this._name, this._data, { TTL: ttl }); // 1 days.
    };

    load() {
        if (!this._name) return; // no name specificed.
        let ttl = (this._ttl) ? this._ttl : 0;
        this._data = nlib.storage.get(this._name);
    };

    //-- public properties.
    get name() { return this._name; };
    set name(value) { this._name = value; };

    get data() { return this._data; };
    set data(value) { this._data = value; };

    get ttl() { return this._ttl; };
    set ttl(value) { this._ttl = value; };
};

//#endregion

//#region UserPerference class

class UserPerference extends LocalStorage {
    constructor() {
        super();
        this.name = 'uperf'
        this.ttl = 0;
        this._prefchanged = null;
        this.load();
        this.checkExist();
    };

    //-- public methods.
    getDefault() {
        return {
            langId: 'EN'
        }
    };

    load() {
        super.load();
    };

    save() {
        super.save();
    };

    //-- public properties.
    get langId() {
        if (!this.data) this.checkExist();
        return this.data.langId;
    };
    set langId(value) {
        if (!this.data) this.checkExist();
        this.data.langId = value;
    };
};

//#endregion

//#region DbApi class

class DbApi {
    static parse(r) {        
        let ret = { records: null, errors: null, out: null };
        if (r && r.result) {
            //console.log(r.result)
            ret.records = r.result.data;
            ret.out = r.result.out;
            ret.errors = r.result.errors;
        }
        return ret;
    }
}

const api = DbApi; // create shortcur variable.

//#endregion

//#region LanguageService class

class LanguageService {
    constructor() {
        this._pref = new UserPerference();
        this._pref.load(); // load once.
        this._current = null;
        this._languages = [];
        this._languageListChanged = new EventHandler();
        this._currentChanged = new EventHandler();
    }
    change(langId) {
        let ret = null;
        if (langId && langId.length >= 2) {
            let langs = this._languages.map((item) => item.langId.toUpperCase());
            let index = langs.indexOf(langId.toUpperCase());
            if (index !== -1) {
                let newVal = this._languages[index];
                if (newVal) {
                    if (this._current) {
                        if (this._current.langId.toUpperCase() !== newVal.langId.toUpperCase()) {
                            // LangId changed.
                            this._current = newVal;
                            // keep to perf.
                            this._pref.langId = this._current.langId.toUpperCase();
                            this._pref.save();

                            // get current user.
                            //secure.getCurrentUser(this._current.langId.toUpperCase());

                            // raise event.
                            this._currentChanged.invoke(this, EventArgs.Empty);
                        }
                    }
                    else {
                        // no current so set new one.
                        this._current = newVal;
                        // keep to perf.
                        this._pref.langId = this._current.langId.toUpperCase();
                        this._pref.save();

                        // get current user.
                        //secure.getCurrentUser(this._current.langId.toUpperCase());

                        // raise event.
                        this._currentChanged.invoke(this, EventArgs.Empty);
                    }
                }
            }
        }
    }
    getLanguages() {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            //console.log(data);
            self._languages = data.records;
            self._languageListChanged.invoke(self, EventArgs.Empty);
            self.change(self._pref.langId); // set langId from preference.
        }
        XHR.get('/api/languages/search', { enable: true }, fn);
    }
    get languages() { return this._languages; }
    get current() { return this._current; }
    get langId() {
        let ret;
        if (!this._current || !this._current.langId) {
            ret = null;
        }
        else {
            ret = this._current.langId.toUpperCase();
        }
        return ret;
    }
    get languageListChanged() { return this._languageListChanged; }
    get currentChanged() { return this._currentChanged; }
};

; (function () {
    //console.log('Init language service...');
    window.lang = window.lang || new LanguageService();
    lang.getLanguages();
})();

//#endregion

