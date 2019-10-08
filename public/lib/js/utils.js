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