//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];

const fs = require('fs');
const mkdirp = require('mkdirp')

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

//#region Language api class

const api = class {
    static async GetLanguages(db, params) {
        return await db.GetLanguages(params);
    }
    static async SaveVote(db, params) {
        return await db.SaveVote(params);
    }
}

//#endregion

const routes = class {
    /**
     * Gets language list.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getQuestion(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        params.qsetid = 'QS00001' // hard code.
        let targetPath = path.join(rootPath, 'customer', params.customerId, 'Question')
        mkdirp.sync(targetPath);
        let targetFile =  path.join(targetPath, params.qsetid + '.json')
        let data = {
            id: params.qsetid,
            data: params.data
        };
        let json = JSON.parse(fs.readFileSync(targetFile))

        let result = nlib.NResult.data(json);
        WebServer.sendJson(req, res, result);
    }

    static SaveVote(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return api.SaveVote(db, params);
        }
        exec(db, fn).then(data => {
            let result;
            let dbResult = validate(db, data);
            result = {
                data : dbResult.data,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }

            WebServer.sendJson(req, res, result);
        })
    }
}

//router.get('/search', check1, check2, routes.getLanguages)
router.all('/question/search', routes.getQuestion)
router.all('/question/vote/save', routes.SaveVote)

const init_routes = (svr) => {
    svr.route('/customer/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;