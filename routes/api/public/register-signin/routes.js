//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];

// for production
const nlibPath = path.join(rootPath, 'nlib');
// for nlib-server dev project
//const nlibPath = path.join(rootPath, 'src', 'server', 'js', 'nlib');
const nlibjs = path.join(nlibPath, 'nlib');
const nlib = require(nlibjs);

const nlibExprjs = path.join(nlibPath, 'nlib-express');

const WebServer = require(nlibExprjs);

//#endregion

//#region database requires

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));
//const db = new sqldb();

//#endregion

//#region secure middleware

const raterPath = path.join(rootPath, 'raterweb');
const raterSecurejs = path.join(raterPath, 'rater-secure')
const secure = require(raterSecurejs).RaterSecure;

//#endregion

//#region router type and variables

const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

//#region exec/validate wrapper method

const exec = async (db, callback) => {
    let ret;
    let connected = await db.connect();
    if (connected) {
        ret = await callback();
        await db.disconnect();
    }
    else {
        ret = db.error(db.errorNumbers.CONNECT_ERROR, 'No database connection.');
    }
    return ret;
}
const validate = (db, data) => {
    let result = data;
    if (!result) {
        result = db.error(db.errorNumbers.NO_DATA_ERROR, 'No data returns');
    }
    else {
        result = checkForError(data);
    }
    return result;
}
const checkForError = (data) => {
    let result = data;
    if (result.out && result.out.errNum && result.out.errNum !== 0) {
        result.errors.hasError = true;
        result.errors.errNum = result.out.errNum;
        result.errors.errMsg = result.out.errMsg;
    }
    return result;
}

//#endregion

//#region api class

const api = class {
    static async Register(db, params) {
        return await db.Register(params);
    }
    static async SignIn(db, params) {
        return await db.SignIn(params);
    }
    static async CheckUsers(db, params) {
        return await db.CheckUsers(params);
    }
}

//#endregion

const routes = class {
    /**
     * Register customer.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static register(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return api.Register(db, params);
        }
        exec(db, fn).then(data => {
            let result = validate(db, data);
            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * Validatae user accounts.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static validateAcccounts(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        
        let fn = async () => {
            return api.CheckUsers(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);
            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }

            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.customerId);
                let idx = map.indexOf(rec.customerId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { customerId: rec.customerId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.FullName = rec.FullName;
                nobj.CustomerName = rec.CustomerName;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * User sign in.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static signin(req, res, next) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return api.SignIn(db, params);
        }
        exec(db, fn).then(data => {
            let result = validate(db, data);
            if (result && !result.errors.hasError && result.out.errNum === 0) {
                let obj = {
                    accessId: result.out.accessId
                }
                WebServer.signedCookie.writeObject(req, res, obj, WebServer.expires.in(5).years);
            }
            WebServer.sendJson(req, res, result);
        })
    }
}

router.post('/register', routes.register)
router.post('/validate-accounts', routes.validateAcccounts)
router.post('/signin', routes.signin)
//router.post('/signout', secure.signout, secure.checkAccess, secure.checkRedirect)
router.post('/signout', secure.signout)

const init_routes = (svr) => {
    svr.route('/api/customer', router);
};

module.exports.init_routes = exports.init_routes = init_routes;