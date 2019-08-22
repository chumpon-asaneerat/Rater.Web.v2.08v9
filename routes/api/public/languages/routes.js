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
    return result;
}

//#endregion

//#region Language api class

const languageAPI = class {
    static async GetLanguages(params) {
        return await db.GetLanguages(params);
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
    static getLanguages(req, res) {
        let params = WebServer.parseReq(req).data;
        let fn = async () => {
            return languageAPI.GetLanguages(params);
        }
        exec(fn).then(data => {
            let result = validate(data);
            WebServer.sendJson(req, res, result);
        })
    }
}

const check1 = (req, res, next) => {
    console.log('check 1 call and wait 2 seoncds :', new Date().toString());
    setTimeout(() => {
        console.log('check 1 passed :', new Date().toString());
        next()
    }, 2000);
}

const check2 = (req, res, next) => {
    console.log('check 2 call but not call next');
}

//router.use(check1);
//router.use(check2);

//router.get('/search', check1, check2, routes.getLanguages)
router.all('/search', routes.getLanguages)

const init_routes = (svr) => {
    svr.route('/api/languages', router);
};

module.exports.init_routes = exports.init_routes = init_routes;