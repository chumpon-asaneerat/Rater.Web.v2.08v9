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

//#retion database requires

const sqldb = require('./../../../../TestDb8.db');
const db = new sqldb();

//#endretion

//#region router type and variables

const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const routes = class {
    /**
     * getJson
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getLanguages(req, res) {
        let params = req.body;
        let ret;
        let fn = async () => {
            let connected = await db.connect();
            if (connected) {
                ret = await db.GetLanguages(params);
                await db.disconnect();
            }
            return ret;
        };
        fn().then((data) => {
            WebServer.sendJson(req, res, data);
        })
    }
}

router.get('/search', routes.getLanguages)

const init_routes = (svr) => {
    svr.route('/api/languages', router);
};

module.exports.init_routes = exports.init_routes = init_routes;