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
     * getfile
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getfile(req, res) {
        let file = req.params.file.toLowerCase();
        let files = ['app.js']
        let idx = files.indexOf(file);
        if (idx !== -1) {
            WebServer.sendFile(req, res, __dirname, files[idx]);
        }
        else {
            routes.getContent(req, res)
        }
    }
    static getContent(req, res) {
        let file = req.params.file.toLowerCase();
        if (file === 'contents') {
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

    /**
     * api2
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static api2(req, res) {
        let data = { message: 'The api 2 (secure)' }
        let ret = nlib.NResult.data(data);
        let obj = {
            val1: 1,
            val2: new Date().toString()
        }
        WebServer.signedCookie.writeObject(req, res, obj, WebServer.expires.in(5).years);
        //WebServer.signedCookie.writeObject(req, res, obj, WebServer.expires.in(1).months);
        //WebServer.cookie.writeObject(req, res, obj);
        WebServer.sendJson(req, res, ret);
    }
    /**
     * api3
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static api3(req, res) {
        let data = { message: 'The api 3 (super secure)' }
        let obj = WebServer.signedCookie.readObject(req, res);
        data.obj = obj;
        let ret = nlib.NResult.data(data);
        WebServer.sendJson(req, res, ret);
    }
}

const checkSecure = (req, res, next) => {
    console.log('secure checked.');
    next();
}

const checkSecure2 = (req, res, next) => {
    console.log('secure level 2 checked.');
    next();
}

router.use(checkSecure)
router.get('/', routes.home)
router.get('/:file', routes.getfile)
router.get('/api2', routes.api2)
router.get('/api3', checkSecure2, routes.api3)

const init_routes = (svr) => {
    svr.route('/customer/device', router);
};

module.exports.init_routes = exports.init_routes = init_routes;
