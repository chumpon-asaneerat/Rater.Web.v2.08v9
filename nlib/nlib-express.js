/** @module server/nlib-express */

//#region Packages Required

const path = require('path');
const fs = require('fs');
const nlib = require('./nlib');
// common middlewares.
const express = require("express");
const http = require('http');
const socket = require('socket.io');

const statusMon = require('express-status-monitor');

const helmet = require("helmet");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const favicon = require("serve-favicon");
const formidable = require('formidable');

const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//#endregion

//#region WebServer default configurations

const defaultApp = { 
    name:'NLib Web Server Application', 
    version:'2.0.0', 
    updated: '2019-08-08 09:30' 
};
const defaultWSvr = { 
    port: 3000,
    websocket: { enable: false },
    monitor: { enable: false },
    swagger: { enable: false, apis: [ "./server.js" ] },
    cookies: { secret: 'YOUR_SECURE_KEY@123' },
    favicon : { path: "public", fileName: "favicon.ico" },
    public: {
        paths: [
            { route: "/public", path: "public", maxAge: "30s", enable: true },
            { route: "/dist/js", path: "public/dist/jquery-3.3.1", maxAge: "15s", enable: true },
            { route: "/dist/css", path: "public/dist/jquery-ui-1.12.1", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/jquery-ui-1.12.1", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/popperjs-1.15.0", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/tooltipjs-1.3.2", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/bootstrap-4.2.1", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/font-awesome-5.9.0", maxAge: "15s", enable: true },
            { route: "/dist/css", path: "public/dist/emoji-symbols-1.0.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/flag-icon-css-3.1.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/animate-css-3.7.2", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/moment-2.24.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/chart-js-2.8.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/chart-js-plugin-datalabels-0.6.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/chart-js-plugin-piechart-outlabels-0.1.4", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/howler-2.1.2", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/jquery-org-chart-2.1.3", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/tabulator-4.3.0", maxAge: "15s", enable: true },
            { route: "/dist/js", path: "public/dist/ace-1.4.5", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/simplebar-4.1.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/overlay-scrollbars-1.9.1", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/socket.io-2.2.0", maxAge: "15s", enable: true },
            { route: "/dist", path: "public/dist/reveal-3.8.0", maxAge: "15s", enable: false },
            { route: "/dist/js", path: "public/dist/riotjs-3.13.2", maxAge: "15s", enable: true },
            { route: "/components", path: "dist/component/riot", maxAge: "15s", enable: true }
        ]
    }
};

//#endregion

//#region WebServer helper methods

const loadconfig = () => {
    console.log('load configuration.');
    let cfg = nlib.Config;
    if (!cfg.exists()) {
        // Set the default app config.
        cfg.set('app', defaultApp);
        // Set the default webserver config.
        cfg.set('webserver', defaultWSvr);
        // save to file.
        cfg.update();
    }
    return cfg;
};
const init_statusMonitor = (app, io, cfg) => {
    let usedMonitor = cfg.get('webserver.monitor.enable');
    if (!usedMonitor) return; // disable.
    console.info('use "express-status-monitor".');
    let appName = nlib.Config.get('app.name');
    let options = {
        title: appName + ' Status', // Default title
        //theme: 'default.css',     // Default styles
        path: '/status',
        //socketPath: '/socket.io', // In case you use a custom path
        //websocket: existingSocketIoInstance,        
        spans: [{
            interval: 1,            // Every second
            retention: 60           // Keep 60 data points in memory
        }, {
            interval: 5,            // Every 5 seconds
            retention: 60
        }, {
            interval: 15,           // Every 15 seconds
            retention: 60
        }],
        chartVisibility: {
            cpu: true,
            mem: true,
            load: true,
            responseTime: true,
            rps: true,
            statusCodes: true
        },
        //ignoreStartsWith: '/admin',
        healthChecks: []
    }

    if (io) options.websocket = io; // set exists socket io.

    app.use(statusMon(options));
};
const init_helmet = (app) => {
    console.info('use "helmet".');
    app.use(helmet());
};
const init_logger = (app) => {
    console.info('use "logger (morgan)".');    
    app.use(morgan("dev"));
};
const init_cookie_parser = (app, cfg) => {
    console.info('use "cookie parser".');    
    // check config.
    let secret = cfg.get('webserver.cookies.secret');
    if (!secret || String(secret).length <= 0) {
        secret = 'YOUR_SECURE_KEY@123'
        cfg.set('webserver.cookies.secret', secret)
        cfg.update();
    }    
    app.use(cookieparser(secret));
};
const init_body_parser = (app) => {
    console.info('use "body parser".');
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
};
const init_fav_icon = (app, cfg) => {
    console.info('use "serve-favicon".');
    let icocfg = cfg.get('webserver.favicon');
    let iconpath = path.join(nlib.paths.root, icocfg.path, icocfg.fileName);
    app.use(favicon(iconpath));
};
const init_public_paths = (app, cfg) => {
    console.info('Setup static routes for public access.');
    let paths = cfg.get('webserver.public.paths');    
    paths.forEach(info => {
        if (info.enable) {
            let localPath = path.join(nlib.paths.root, info.path);
            console.log('publish "' + info.path + '"');
            //console.log('publish "' + localPath + '"');
            app.use(info.route, express.static(localPath, { maxage: info.maxAge }));
        }
    })
};
const init_swagger_doc = (app, cfg) => {
    let enableSwagger = cfg.get('webserver.swagger.enable');
    if (!enableSwagger) return;
    console.info('use "swagger-ui-express" and "swagger-jsdoc".');
    let appName = nlib.Config.get('app.name');
    let appVer = nlib.Config.get('app.version');
    let apis = cfg.get('webserver.swagger.apis');
    console.log('apis:', apis)
    let swaggerSpec = swaggerJSDoc({
        swaggerDefinition: { info: { title: appName + ' APIs', version: appVer } },
        apis: apis
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
const init_middlewares = (app, io, cfg) => {
    //? load common middlewares.
    //! be careful the middleware order is matter.
    init_statusMonitor(app, io, cfg);
    init_helmet(app);
    init_logger(app);
    init_cookie_parser(app, cfg);
    init_body_parser(app);
    init_fav_icon(app, cfg);
    init_public_paths(app, cfg);
    init_swagger_doc(app, cfg);
};

//#endregion

//#region WebServer class

/**
 * The Web Server (express.js) class.
 */
const WebServer = class {
    //#region constructor

    /**
     * Create new instance of WebServer class.
     */
    constructor() {
        // load config.
        let cfg = loadconfig();
        /** The Express Application instance.*/
        this.app = express();
        console.log('Express app instance created.');
        this.server = http.Server(this.app);
        console.log('HTTP server instance created.');
        this.enableWebSocket = cfg.get('webserver.websocket.enable');
        
        this.io = (this.enableWebSocket) ? socket(this.server) : null;
        if (this.io) console.log('Websocket instance created.');
        
        // init middlewares.
        init_middlewares(this.app, this.io, cfg);
    }

    //#endregion

    //#region public methods

    //#region listen method

    /**
     * Start the web server to listen request.
     */
    listen() {
        let port = nlib.Config.get('webserver.port');
        let name = nlib.Config.get('app.name');
        
        this.server.listen(port);
        console.log(`${name} listen on port: ${port}`)
    }

    //#endregion

    //#region route related methods

    /**
     * get
     * @param {string | RegExp | Array<string | RegExp>} path The path.
     * @param {express.RequestHandler[]} handlers The handlers.
     */
    get(path, ...handlers) { this.app.get(path, ...handlers); }
    /**
     * post
     * @param {string | RegExp | Array<string | RegExp>} path The path.
     * @param {express.RequestHandler[]} handlers The handlers.
     */
    post(path, ...handlers) { this.app.post(path, ...handlers); }
    /**
     * all
     * @param {string | RegExp | Array<string | RegExp>} path The path.
     * @param {express.RequestHandler[]} handlers The handlers.
     */
    all(path, ...handlers) { this.app.all(path, ...handlers); }

    //#endregion

    //#region request/response related method

    /**
     * Send Json.
     * @param {Request} req The express request instance.
     * @param {Response} res The express response instance.
     * @param {Any} data The data to send in json.
     */
    sendJson(req, res, data) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.write(JSON.stringify(data, null, 4,));
        res.end();
    }

    //#endregion

    //#endregion

    //#region static properties for export classes and consts

    /** 
     * The NCookie class.
     * @ignore
     */
    static get cookie() { return NCookie; }
    static get signedCookie() { return NSignedCookie; }
    /** The expires time unit in millisecond */
    static get expires() { return NExpires; }

    //#endregion
}

//#endregion

//#region NExpires Class

class NExpires {
    //#region constructor

    constructor(value) { this.value = value; }

    //#endregion

    //#region public properties

    /** Gets calculate millisecond of days */
    get days() { return (this.value * 24 * 60 * 60 * 1000); }
    /** Gets calculate millisecond of hours */
    get hours() { return (this.value * 60 * 60 * 1000); }
    /** Gets calculate millisecond of minutes */
    get minutes() { return (this.value * 60 * 1000); }
    /** Gets calculate millisecond of seconds */
    get seconds() { return (this.value * 1000); }

    //#endregion

    //#region static method

    /**
     * Set to value to calculate to milliseconds.
     * 
     * @param {Number} value The value in number to calculate.
     */
    static in(value) { return new NExpires(value); }

    //#endregion
}

//#endregion

//#region NCookie and NSignedCookie

const parseCookie = (req, name) => {
    return (req && req.cookies && req.cookies[name]) ? req.cookies[name] : null;
};
const storeCookie = (res, name, data, maxAge, httpOnly = true) => {
    if (!res) return;
    let opts = {
        maxAge: maxAge, 
        //expires: new Date(new Date().getTime() + maxAge),
        httpOnly: httpOnly,
        signed: false
    }
    res.cookie(name, data, opts);
};

/**
 * The NCookie class.
 */
class NCookie {
    //#region constructor

    /**
     * Create new instance of NCookie.
     * 
     * @param {Request} req The Request object instance.
     * @param {Response} res The Response object instance.
     * @param {String} name The cookie's name.
     * @param {Number} maxAge The default cookie's maxAge default is 1 day.
     * @param {Boolean} httpOnly The default cookie's httpOnly flag default is true.
     */
    constructor(req, res, name, maxAge = null, httpOnly = true) {
        /** @type {Request} The Request object instance. */
        this.req = req;
        /** @type {Response} The Response object instance. */
        this.res = res;
        /** @type {String} The cookie's name */
        this.name = name;
        /** @type {Number} The cookie default maxAge option */
        this.maxAge = (maxAge) ? maxAge : NExpires.in(1).days;
        /** @type {Boolean} The cookie default httpOnly option */
        this.httpOnly = httpOnly;
    }

    //#endregion

    //#region public methods

    /**
     * Gets the value from specificed cookie's name.
     * 
     * @return {String} Returns value for specificed cookie name. If not found returns null.
     */
    get() { return parseCookie(this.req, this.name); }
    /**
     * Store value to specificed cookie's name.
     * 
     * @param {String} data The data to stored to cookie.
     * @param {Number} maxAge The cookie's maxAge.
     */
    set(data, maxAge) {
        let age = (maxAge) ? maxAge : this.maxAge;
        storeCookie(this.res, this.name, data, age, this.httpOnly);
    }

    //#endregion
};

const parseSignedCookie = (req, name) => {
    return (req && req.signedCookies && req.signedCookies[name]) ? req.signedCookies[name] : null;
};
const storeSignedCookie = (res, name, data, maxAge, httpOnly = true) => {
    if (!res) return;
    let opts = {
        maxAge: maxAge, 
        //expires: new Date(new Date().getTime() + maxAge),
        httpOnly: httpOnly,
        signed: true
    }
    res.cookie(name, data, opts);
};

/**
 * The NSignedCookie class.
 */
class NSignedCookie {
    //#region constructor

    /**
     * Create new instance of NCookie.
     * 
     * @param {Request} req The Request object instance.
     * @param {Response} res The Response object instance.
     * @param {String} name The cookie's name.
     * @param {Number} maxAge The default cookie's maxAge default is 1 day.
     * @param {Boolean} httpOnly The default cookie's httpOnly flag default is true.
     */
    constructor(req, res, name, maxAge = null, httpOnly = true) {
        /** @type {Request} The Request object instance. */
        this.req = req;
        /** @type {Response} The Response object instance. */
        this.res = res;
        /** @type {String} The cookie's name */
        this.name = name;
        /** @type {Number} The cookie default maxAge option */
        this.maxAge = (maxAge) ? maxAge : NExpires.in(1).days;
        /** @type {Boolean} The cookie default httpOnly option */
        this.httpOnly = httpOnly;

        let secret = nlib.Config.get('webserver.cookies.secret');
        this.hasSecretKey = (secret && secret.length > 0);
    }

    //#endregion

    //#region public methods

    /**
     * Gets the value from specificed cookie's name.
     * 
     * @return {String} Returns value for specificed cookie name. If not found returns null.
     */
    get() {
        let ret;        
        if (this.hasSecretKey)
            ret = parseSignedCookie(this.req, this.name);
        else ret = parseCookie(this.req, this.name);

        return ret;
    }
    /**
     * Store value to specificed cookie's name.
     * 
     * @param {String} data The data to stored to cookie.
     * @param {Number} maxAge The cookie's maxAge.
     */
    set(data, maxAge) {
        let age = (maxAge) ? maxAge : this.maxAge;
        if (this.hasSecretKey)
            storeSignedCookie(this.res, this.name, data, age, this.httpOnly);
        else storeCookie(this.res, this.name, data, age, this.httpOnly);
    }

    //#endregion
}

//#endregion

//#region Upload files route

const initUploadProgressHandler = (form, req, res) => {
    form.on('progress', (bytesReceived, bytesExpected) => {
        //let percent_complete = (bytesReceived / bytesExpected) * 100;
        //console.log(percent_complete.toFixed(2));
        // required socket.io to emit event back to client.
    })
}
const initUploadFieldHandler = (form, req, res) => {
    form.on('field', (name, field) => { 
        console.log('Field', name, field)
    })
}
const initUploadFileBeginHandler = (form, req, res) => {
    form.on('fileBegin', (name, file) => {
        let dest = path.join(__dirname, 'uploads'); //! change path here!!!
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        file.path = path.join(dest, file.name);
    })
}
const initUploadFileHandler = (form, req, res) => {
    form.on('file', (name, file) => {
        console.log('Uploaded ' + file.name);
    })
}
const initUploadAbortedHandler = (form, req, res) => {
    form.on('aborted', () => {
        console.error('Request aborted by the user')
    })
}
const initUploadErrorHandler = (form, req, res) => {
    form.on('error', (err) => {
        console.error('Error', err)
        throw err
    })
}
const initUploadEndHandler = (form, req, res) => {
    form.on('end', () => {
        res.end()
    })
}

const uploadfiles = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.encoding = 'utf-8';
    // Limits the amount of memory all fields together (except files) can allocate in bytes.
    // If this value is exceeded, an 'error' event is emitted. The default size is 20MB.
    form.maxFieldsSize = 20 * 1024 * 1024; // used default.

    // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. 
    // The default size is 200MB.
    form.maxFileSize = 5 * 1024 * 1024 * 1024; // exntend to 5GB.

    // Limits the number of fields that the querystring parser will decode.
    // Defaults to 1000 (0 for unlimited).
    form.maxFields = 1000; // used default.

    // If this option is enabled, when you call form.parse, the files argument will contain 
    // arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
    form.multiples = true;

    form.parse(req);

    initUploadProgressHandler(form, req, res);
    initUploadFieldHandler(form, req, res);
    initUploadFileBeginHandler(form, req, res);
    initUploadFileHandler(form, req, res);
    initUploadAbortedHandler(form, req, res);
    initUploadErrorHandler(form, req, res);
    initUploadEndHandler(form, req, res);
}

//#endregion

//#region exports

module.exports = exports = WebServer;

/**
 * export Express RequestHandler type definition.
 * @type {express.RequestHandler}
 * @ignore
 */
module.exports.RequestHandler = exports.RequestHandler = express.RequestHandler;

module.exports.uploadfiles = exports.uploadfiles = uploadfiles;

//#endregion

/*
class NJwtService {
    validateDevice(req, res, next) {
        let name = `x-device`;
        let data = ncookie.parse(req, name);
        if (!data) {
            let token = uuidv4();
            ncookie.store(res, name, token);
        }
        next();
    };
    signin(req, res, next) {
    };
    signout(req, res, next) {
    };

};
*/