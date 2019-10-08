class OrgLoader {
    constructor() {
        this.content = null;
        this.current = null;
        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();            
        }
        document.addEventListener('language:changed', contentChanged)
    }
    load() {
        let self = this;
        let url = '/customer/api/org/search';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
        }
        XHR.postJson(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        let evt = new CustomEvent('org:list:changed')
        document.dispatchEvent(evt);
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
}

class BranchLoader {
    constructor() {
        this.content = null;
        this.current = null;

        this._selIndex = -1;

        let self = this;
        let contentChanged = (e) => {
            self.current = self.getCurrent();
        }
        document.addEventListener('language:changed', contentChanged)
    }
    load() {
        let self = this;
        let url = '/customer/api/branch/search';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
        }
        XHR.postJson(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        let evt = new CustomEvent('branch:list:changed')
        document.dispatchEvent(evt);
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
    get selectedIndex() { return this._selIndex; }
    set selectedIndex(value) {
        if (this._selIndex != value) {
            this._selIndex = value;
            if (this._selIndex === undefined || this._selIndex === null) {
                this._selIndex = -1;
            }
            else {
                if (this._selIndex > this.content.length) {
                    this._selIndex = -1;
                }
            }
        }
    }
    get selectedItem() {
        let ret = null;
    }
    addnew() {
        let ret;

        return ret;
    }
    saveItem(item) {
        let ret;

        return ret;
    }
}

class OrgManager {
    constructor() {
        this.org = new OrgLoader();
        this.branch = new BranchLoader();
    }
    load() {
        this.org.load();
        this.branch.load();
    }
}

;(function () {
    window.orgmanager = window.orgmanager || new OrgManager();
    window.orgmanager.load();
})();
