//#region common requires

const path = require('path');
const rootPath = process.env['ROOT_PATHS'];

// fs helper methods.
const fs = require('fs');

const isDirectory = (source) => {
    return fs.lstatSync(source).isDirectory()
}
const isFile = (source) => {
    return fs.lstatSync(source).isFile()
}
const getDirectories = (source) => { 
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
}
const getFiles = (source) => { 
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile)
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
     * Gets Content.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static getContent(req, res) {
        let contentPath = path.join(rootPath, 'concept', 'contents');
        //let langid = 'EN';
        let folders = getDirectories(contentPath);
        let json = {}
        if (folders) {
            folders.forEach(dir => {
                let langId = dir.replace(contentPath + '\\', '');
                let langPath = path.join(contentPath, langId);
                json[langId] = {};
                let subdirs = getDirectories(langPath);
                if (subdirs) {
                    subdirs.forEach(subdir => {
                        let subdirId = subdir.replace(langPath + '\\', '');
                        json[langId][subdirId] = {}
                        let files = getFiles(subdir)
                        if (files) {
                            files.forEach(file => {
                                if (file.endsWith('.json')) {
                                    let fileId = file.replace(subdir + '\\', '').replace('.json', '');
                                    json[langId][subdirId][fileId] = JSON.parse(fs.readFileSync(file), 'utf8');
                                }
                            })
                        }
                    })
                }
            })
        }

        let appPath = path.join(contentPath, 'app');
        let scrPath = path.join(contentPath, 'screen');

        let result = {
            text: 'api work!!',
            data: json
        }
        WebServer.sendJson(req, res, result);
    }
}

router.all('/search', routes.getContent)

const init_routes = (svr) => {
    svr.route('/api/content', router);
};

module.exports.init_routes = exports.init_routes = init_routes;