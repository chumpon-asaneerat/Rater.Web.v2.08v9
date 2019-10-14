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
        //await db.disconnect();
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
    static async GetMemberTypes(db, params) {        
        return await db.GetMemberTypes(params);
    }
    static async GetPeriodUnits(db, params) {
        return await db.GetPeriodUnits(params);
    }
    static async GetLimitUnits(db, params) {
        return await db.GetLimitUnits(params);
    }
    static async GetLicenseTypes(db, params) {
        return await db.GetLicenseTypes(params);
    }
    static async GetLicenseFeatures(db, params) {
        return await db.GetLicenseFeatures(params);
    }
    static async GetDeviceTypes(db, params) {
        return await db.GetDeviceTypes(params);
    }
}

//#endregion

const routes = class {
    /**
     * GetMemberTypes.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetMemberTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetMemberTypes(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.memberTypeId);
                let idx = map.indexOf(rec.memberTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { memberTypeId: rec.memberTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.MemberTypeDescription;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * GetLimitUnits.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetLimitUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetLimitUnits(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.limitUnitId);
                let idx = map.indexOf(rec.limitUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { limitUnitId: rec.limitUnitId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.LimitUnitDescription;
                nobj.Text = rec.LimitUnitText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * GetPeriodUnits.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetPeriodUnits(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetPeriodUnits(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.periodUnitId);
                let idx = map.indexOf(rec.periodUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { periodUnitId: rec.periodUnitId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.Description = rec.PeriodUnitDescription;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * GetDeviceTypes.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetDeviceTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.deviceTypeId = null;

        let fn = async () => {
            return api.GetDeviceTypes(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.deviceTypeId);
                let idx = map.indexOf(rec.deviceTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { deviceTypeId: rec.deviceTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.type = rec.Type;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * GetLicenseTypes.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetLicenseTypes(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;

        let fn = async () => {
            return api.GetLicenseTypes(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { licenseTypeId: rec.licenseTypeId }
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }
                nobj.type = rec.Type;
                nobj.Description = rec.LicenseTypeDescription;
                nobj.AdText = rec.AdText;
                nobj.periodUnitId = rec.periodUnitId;
                nobj.NoOfUnit = rec.NoOfUnit;
                nobj.UseDefaultPrice = rec.UseDefaultPrice;
                nobj.Price = rec.Price;
                nobj.CurrencySymbol = rec.CurrencySymbol;
                nobj.CurrencyText = rec.CurrencyText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
    /**
     * GetLicenseFeatures.
     * 
     * @param {Request} req The Request.
     * @param {Response} res The Response.
     */
    static GetLicenseFeatures(req, res) {
        let db = new sqldb();
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.licenseTypeId = null;

        let fn = async () => {
            return api.GetLicenseFeatures(db, params);
        }
        exec(db, fn).then(data => {
            let dbResult = validate(db, data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let ret = {};

            records.forEach(rec => {
                if (!ret[rec.langId]) {
                    ret[rec.langId] = []
                }
                let map = ret[rec.langId].map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { licenseTypeId: rec.licenseTypeId }
                    nobj.items = [];
                    // init lang properties list.
                    ret[rec.langId].push(nobj)
                }
                else {
                    nobj = ret[rec.langId][idx];
                }

                let seqs = nobj.items.map(item => item.seq);
                let idx2 = seqs.indexOf(rec.seq);
                let nobj2;
                if (idx2 === -1) {
                    nobj2 = {
                        seq: rec.seq
                    }
                    nobj.items.push(nobj2);
                }
                else {
                    nobj2 = seqs[idx2];
                }                
                nobj2.limitUnitId = rec.limitUnitId;
                nobj2.NoOfLimit = rec.NoOfLimit;
                nobj2.UnitDescription = rec.LimitUnitDescription;
                nobj2.UnitText = rec.LimitUnitText;
            })
            // set to result.
            result.data = ret;

            WebServer.sendJson(req, res, result);
        })
    }
}

router.all('/membertypes', routes.GetMemberTypes)
router.all('/limitunits', routes.GetLimitUnits)
router.all('/periodunits', routes.GetPeriodUnits)
router.all('/devicetypes', routes.GetDeviceTypes)
router.all('/licensetypes', routes.GetLicenseTypes)
router.all('/licensefeatures', routes.GetLicenseFeatures)

const init_routes = (svr) => {
    svr.route('/api/', router);
};

module.exports.init_routes = exports.init_routes = init_routes;