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
const db = new sqldb();

//#endregion

//#region router type and variables

const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

//#region exec/validate wrapper method

const exec = async (callback) => {
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
const validate = (data) => {
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
    static async Register(params) {
        return await db.Register(params);
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
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return api.Register(params);
        }
        exec(fn).then(data => {
            let result = validate(data);
            WebServer.sendJson(req, res, result);
        })
    }
}

router.all('/register', routes.register)

const init_routes = (svr) => {
    svr.route('/api/customer', router);
};

module.exports.init_routes = exports.init_routes = init_routes;