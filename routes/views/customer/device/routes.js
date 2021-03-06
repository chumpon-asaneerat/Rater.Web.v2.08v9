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
    /**
     * getjsfile
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getjsfile(req, res) {
        let file = req.params.file.toLowerCase();
        let files = ['app.js']
        let idx = files.indexOf(file);
        if (idx !== -1) {
            let fname = path.join(__dirname, 'js', files[idx]);
            WebServer.sendFile(req, res, fname);
        }
    }
    static getContents(req, res) {
        let contentPath = path.join(__dirname, 'contents');
        let folders = getDirectories(contentPath);
        let json = {}
        folders.forEach(dir => {
            let langId = dir.replace(contentPath + '\\', '')
            json[langId] = JSON.parse(fs.readFileSync(path.join(dir, 'content.json'), 'utf8'))
        })
        WebServer.sendJson(req, res, nlib.NResult.data(json));
    }
}

router.get('/', routes.home)
router.get('/contents', routes.getContents)
router.get('/js/:file', routes.getjsfile)

const init_routes = (svr) => {
    svr.route('/customer/device', router);
};

module.exports.init_routes = exports.init_routes = init_routes;
