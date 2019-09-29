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
    static async GetMemberTypes(params) {
        return await db.GetMemberTypes(params);
    }
    static async GetPeriodUnits(params) {
        return await db.GetPeriodUnits(params);
    }
    static async GetLimitUnits(params) {
        return await db.GetLimitUnits(params);
    }
    static async GetLicenseTypes(params) {
        return await db.GetLicenseTypes(params);
    }
    static async GetLicenseFeatures(params) {
        return await db.GetLicenseFeatures(params);
    }
    static async GetDeviceTypes(params) {
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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetMemberTypes(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.memberTypeId);
                let idx = map.indexOf(rec.memberTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { memberTypeId: rec.memberTypeId }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                nobj[rec.langId].Description = rec.MemberTypeDescription;
            })
            // set array to result.
            result.data = rets;

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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetLimitUnits(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.limitUnitId);
                let idx = map.indexOf(rec.limitUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { limitUnitId: rec.limitUnitId }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                nobj[rec.langId].Description = rec.LimitUnitDescription;
                nobj[rec.langId].Text = rec.LimitUnitText;
            })
            // set array to result.
            result.data = rets;

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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.enabled = true;

        let fn = async () => {
            return api.GetPeriodUnits(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.periodUnitId);
                let idx = map.indexOf(rec.periodUnitId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { periodUnitId: rec.periodUnitId }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                nobj[rec.langId].Description = rec.PeriodUnitDescription;
            })
            // set array to result.
            result.data = rets;

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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.deviceTypeId = null;

        let fn = async () => {
            return api.GetDeviceTypes(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.deviceTypeId);
                let idx = map.indexOf(rec.deviceTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { deviceTypeId: rec.deviceTypeId }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                nobj[rec.langId].type = rec.Type;
            })
            // set array to result.
            result.data = rets;

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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;

        let fn = async () => {
            return api.GetLicenseTypes(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { licenseTypeId: rec.licenseTypeId }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                nobj[rec.langId].Description = rec.LicenseTypeDescription;
                nobj[rec.langId].AdText = rec.AdText;
                nobj[rec.langId].periodUnitId = rec.periodUnitId;
                nobj[rec.langId].NoOfUnit = rec.NoOfUnit;
                nobj[rec.langId].UseDefaultPrice = rec.UseDefaultPrice;
                nobj[rec.langId].Price = rec.Price;
                nobj[rec.langId].CurrencySymbol = rec.CurrencySymbol;
                nobj[rec.langId].CurrencyText = rec.CurrencyText;
            })
            // set array to result.
            result.data = rets;

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
        let params = WebServer.parseReq(req).data;
        // force langId to null;
        params.langId = null;
        params.licenseTypeId = null;

        let fn = async () => {
            return api.GetLicenseFeatures(params);
        }
        exec(fn).then(data => {
            let dbResult = validate(data);

            let result = {
                data : null,
                //src: dbResult.data,
                errors: dbResult.errors,
                //multiple: dbResult.multiple,
                //datasets: dbResult.datasets,
                out: dbResult.out
            }
            let records = dbResult.data;
            let langs = records.map(rec => rec.langId);
            let rets = [];

            records.forEach(rec => {
                let map = rets.map(c => c.licenseTypeId);
                let idx = map.indexOf(rec.licenseTypeId);
                let nobj;
                if (idx === -1) {
                    // set id
                    nobj = { 
                        licenseTypeId: rec.licenseTypeId
                    }
                    // init lang properties list.
                    langs.forEach(lang => { nobj[lang] = {} })
                    rets.push(nobj)
                }
                else {
                    nobj = rets[idx];
                }
                if (!nobj[rec.langId].items) nobj[rec.langId].items = [];

                let seqs = nobj[rec.langId].items.map(item => item.seq);
                let idx2 = seqs.indexOf(rec.seq);
                let nobj2;
                if (idx2 === -1) {
                    nobj2 = {
                        seq: rec.seq
                    }
                    nobj[rec.langId].items.push(nobj2);
                }
                else {
                    nobj2 = seqs[idx2];
                }
                
                nobj2.limitUnitId = rec.limitUnitId;
                nobj2.NoOfLimit = rec.NoOfLimit;
                nobj2.UnitDescription = rec.LimitUnitDescription;
                nobj2.UnitText = rec.LimitUnitText;
            })
            // set array to result.
            result.data = rets;

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