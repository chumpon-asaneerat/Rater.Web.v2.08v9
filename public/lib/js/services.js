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

//#region MessageService class

class MessageService {
    warn(value) {
        if (value) {
            let evt = new CustomEvent('app:warning', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
    info(value) {
        if (value) {
            let evt = new CustomEvent('app:info', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
    error(value) {
        if (value) {
            let evt = new CustomEvent('app:error', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
}

; (function () {
    window.logger = window.logger || new MessageService();
})();

//#endregion

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
            let evt = new CustomEvent('languagechanged');
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

//#region ContentService class

class ContentService {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
            // raise event.
            let evt = new CustomEvent('appcontentchanged');
            document.dispatchEvent(evt);
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load(url, paramObj) {
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
            // raise event.
            let evt = new CustomEvent('appcontentchanged');
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

//#region Master Data Loader and Service classes

class MemberTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/membertypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
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

class PeriodUnitsLoader {
    constructor() {
        this.content = null;
        this.current = null
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/periodunits';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
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

class LimitUnitsLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/limitunits';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
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

class DeviceTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/devicetypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
        }
        XHR.get(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class LicenseTypesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/licensetypes';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
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

class LicenseFeaturesLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('languagechanged', contentChanged)
    }
    load() {
        let self = this;
        let url = '/api/licensefeatures';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
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
class MasterService {
    constructor() {
        this.membertypes = new MemberTypesLoader();
        this.periodunits = new PeriodUnitsLoader();
        this.limitunits = new LimitUnitsLoader();
        this.devicetypes = new DeviceTypesLoader();
        this.licesetypes = new LicenseTypesLoader();
        this.licensefeatures = new LicenseFeaturesLoader();
    }
    load() {
        this.membertypes.load()
        this.periodunits.load()
        this.limitunits.load()
        this.devicetypes.load()
        this.licesetypes.load()
        this.licensefeatures.load()
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}
;(function () {
    //console.log('Init content service...');
    window.master = window.master || new MasterService();
    master.load();
})();

//#endregion

//#region ScreenService class

class ScreenService {
    constructor() {
        this.screens = [];
        this.current = null;
        let self = this;
        let appContentChanged = (e) => {
            self.refresh();
        }
        document.addEventListener('appcontentchanged', appContentChanged)
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
            let evt = new CustomEvent('screenchanged', { detail: { screenId: screenId } });
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

//#region SecureService class

class SecureService {
    constructor() {
        this.content = null;
        this.account = { username: '', password: ''}
    }
    reset() {
        this.content = null;
        this.account = { username: '', password: ''}
    }
    register(customername, username, pwd, licenseTypeId) {
        let url = '/api/customer/register'
        let paramObj = { 
            customerName: customername,
            userName: username,
            passWord: pwd,
            licenseTypeId: licenseTypeId
        }
        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            // raise event.
            let evt;
            if (data.errors.hasError) {
                evt = new CustomEvent('registerfailed');
            }
            else {
                evt = new CustomEvent('registersuccess');
            }
            document.dispatchEvent(evt);
        }
        XHR.postJson(url, paramObj, fn);
    }
    verifyUsers(username, pwd) {
        let url = '/api/customer/validate-accounts'
        this.account = { username: username, password: pwd}

        let self = this;
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            // raise event.
            let evt = new CustomEvent('userlistchanged');
            document.dispatchEvent(evt);
        }
        XHR.postJson(url, this.account, fn);
    }
    signin(customerId) {
        let url = '/api/customer/signin'
        let paramObj = {
            customerId: customerId,
            userName: this.account.username,
            passWord: this.account.password
        }
        //console.log('Sign In:', paramObj);
        let fn = (r) => {
            let data = api.parse(r);
            let err = data.errors;
            if (err && err.hasError) {
                //console.log('Sign In Failed.');
                let evt = new CustomEvent('signinfailed', { detail: { error: err }});
                document.dispatchEvent(evt);
            }
            else {
                //console.log('Sign In Success.');
                nlib.nav.gotoUrl('/', true);
            }            
        }
        XHR.postJson(url, paramObj, fn);
    }
    signout() {
        let url = '/api/customer/signout'
        let fn = (r) => {
            //console.log(r);
            //console.log('sign out detected.');
            nlib.nav.gotoUrl('/', true);
        }
        XHR.postJson(url, this.account, fn);
    }
    postUrl(url) {
        if (!url || url.length <= 0) return;
        let fn = (r) => {
            let data = api.parse(r);
            let evt = new CustomEvent('posturlcompleted', { detail: { data: data }});
            document.dispatchEvent(evt);
        }
        XHR.postJson(url, this.account, fn);
    }
    get users() {
        let ret = []
        if (this.content) {
            let usrs = (this.content[lang.langId]) ? this.content[lang.langId] : (this.content['EN']) ? this.content['EN'] : [];
            ret = usrs;
        }
        return ret;
    }
}

; (function () {
    //console.log('Init secure service...');
    window.secure = window.secure || new SecureService();
})();

//#endregion

/*

class QSet {
    constructor() {
        this.qSetId = '';
        this.customerId = '';
        // description        
        this.hasRemark = false;
        this.displayMode = 1;
        this.isDefault = false;
        this.beginDate = new Date();
        this.endDate = new Date();
        this.objectStatus = true;

        this.mlitems = [
            { langId: 'EN', qSetDescriptionNative: 'Question set #1'},
            { langId: 'TH', qSetDescriptionNative: 'ชุดคำถามที่ #1'}
        ];
        
    }
    get description() {
        let currentLangId;
        let langs = this.mlitems.map(item => item.langId);
        let idx = langs.indexOf(currentLangId)
        let ret = (idx !== -1) ? this.mlitems[idx] : this.mlitems[0];
        return ret.qSetDescriptionNative;
    }
}

*/