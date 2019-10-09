class MemberLoader {
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
        let url = '/customer/api/member/search';
        let paramObj = {};
        let fn = (r) => {
            let data = api.parse(r);
            self.content = data.records;
            self.current = self.getCurrent();
        }
        XHR.postJson(url, paramObj, fn);
    }
    save(items) {
        let self = this;
        let url = '/customer/api/member/save';
        //console.log('save:', items)
        let paramObj = {
            items: items
        };
        let fn = (r) => {
            let results = [];
            for (let i = 0; i < r.result.length; i++) {
                //let data = api.parse(r.result[i]);
                let data = {
                    records: r.result[i].data,
                    out: r.result[i].out,
                    errors: r.result[i].errors
                }
                results.push(data)
            }
        }
        XHR.postJson(url, paramObj, fn);
    }
    getCurrent() {
        let match = this.content && this.content[this.langId];
        let ret = (match) ? this.content[this.langId] : (this.content) ? this.content['EN'] : null;
        //console.log('Current:', ret);
        let evt = new CustomEvent('member:list:changed')
        document.dispatchEvent(evt);
        return ret;
    }
    get langId() { 
        return (lang.current) ? lang.current.langId : 'EN';
    }
    find(langId, memberId) {
        let ret = null;
        if (this.current) {
            //console.log('current:', this.content)
            let items = this.content[langId];
            //console.log('items:', items)
            if (items) {                
                let maps = items.map(item => item.memberId);
                let idx = maps.indexOf(memberId);
                ret = (idx !== -1) ? items[idx] : null;
            }
        }
        return ret;
    }
}

class MemberManager {
    constructor() {
        this.member = new MemberLoader();
    }
    load() {
        this.member.load();
    }
}

;(function () {
    window.membermanager = window.membermanager || new MemberManager();
    window.membermanager.load();
})();
