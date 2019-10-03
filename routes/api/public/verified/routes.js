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
}

//#endregion

const routes = class {
    /**
     * check redirect.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static checkredirect(req, res) {
        let obj = WebServer.signedCookie.readObject(req, res);
        let result;
        console.log(obj);
        if (obj) {
            result = nlib.NResult.data(obj);
        }
        else {
            result = nlib.NResult.error(300, 'No key defined.');
        }
        WebServer.sendJson(req, res, result);
    }
}

router.post('/', routes.checkredirect)

const init_routes = (svr) => {
    svr.route('/api/verified', router);
};

module.exports.init_routes = exports.init_routes = init_routes;