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

window.secure = window.secure || new SecureService();

//#endregion
