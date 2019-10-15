//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];

// fs helper methods.
const fs = require('fs');

const isDirectory = (source) => {
    return fs.lstatSync(source).isDirectory()
}
const getDirectories = (source) => { 
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
}

// for production
const nlibPath = path.join(rootPath, 'nlib');
// for nlib-server dev project
//const nlibPath = path.join(rootPath, 'src', 'server', 'js', 'nlib');
const nlibjs = path.join(nlibPath, 'nlib');
const nlib = require(nlibjs);

const nlibExprjs = path.join(nlibPath, 'nlib-express');

const WebServer = require(nlibExprjs);

//#endregion

//#region router type and variables

const WebRouter = WebServer.WebRouter;
const router = new WebRouter();

//#endregion

const routes = class {
    /**
     * home
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static home(req, res) {
        WebServer.sendFile(req, res, __dirname, 'index.html');
    }
}

router.get('/cssgrid3', routes.home)

const init_routes = (svr) => {
    svr.route('/dev', router);
};

module.exports.init_routes = exports.init_routes = init_routes;