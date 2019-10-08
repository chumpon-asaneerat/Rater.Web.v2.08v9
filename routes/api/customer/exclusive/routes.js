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

//#region secure middleware

const raterPath = path.join(rootPath, 'raterweb');
const raterSecurejs = path.join(raterPath, 'rater-secure')
const secure = require(raterSecurejs).RaterSecure;

//#endregion

//#region database requires

const sqldb = require(path.join(nlib.paths.root, 'RaterWebv2x08r9.db'));
//const db = new sqldb();

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
    static async GetBranchs(db, params) {
        return await db.GetBranchs(params);
    }
}

//#endregion

const routes = class {
    static GetBranchs(req, res) {
        let obj = WebServer.signedCookie.readObject(req, res);
        console.log(obj)
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        //params.customerId = obj.customerId;
        params.branchId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetBranchs(db, params);
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
                let map = ret[rec.langId].map(c => c.branchId);
                let idx = map.indexOf(rec.branchId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { branchId: rec.branchId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.branchName = rec.BranchName;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
}

//router.use(secure.checkAccess);
//router.use(secure.checkExclusive);

router.post('/branch/search', routes.GetBranchs);

const init_routes = (svr) => {
    svr.route('/customer/api/exclusive', router);
};

module.exports.init_routes = exports.init_routes = init_routes;