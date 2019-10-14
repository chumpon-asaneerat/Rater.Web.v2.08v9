<device-entry>
    <div class="padtop"></div>
    <div class="padtop"></div>
    <ninput ref="deviceName" title="{ content.label.device.entry.deviceName }" type="text" name="deviceName"></ninput>
    <ninput ref="deviceTypeId" title="{ content.label.device.entry.deviceTypeId }" type="text" name="deciveTypeId"></ninput>
    <!--
    <nselect ref="deviceTypes" title="{ content.label.device.entry.deviceTypeId }"></nselect>
    -->
    <ninput ref="location" title="{ content.label.device.entry.location }" type="text" name="location"></ninput>
    <ninput ref="orgId" title="{ content.label.device.entry.orgId }" type="text" name="orgId"></ninput>
    <ninput ref="memberId" title="{ content.label.device.entry.memberId }" type="text" name="memberId"></ninput>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .padtop {
            display: block;
            margin: 0 auto;
            width: 100%;
            min-height: 10px;
        }
    </style>
    <script>
        let self = this;
        let screenId = 'device';
        let entryId = 'device';

        //#region content variables and methods
        
        let defaultContent = {
            label: {
                device: {
                    entry: { 
                        deviceName: 'Device Name',
                        deviceTypeId: 'Device Type',
                        location: 'Location',
                        orgId: 'Organization',
                        memberId: 'User'
                    }
                }
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                /*
                if (deviceTypes) {
                    deviceTypes.setup(devicemanager.deviceType.current, 'deviceTypeId', 'Type');
                }
                */
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let deviceName, deviceTypeId, location, orgId, memberId;
        //let deviceTypes;

        let initCtrls = () => {
            deviceName = self.refs['deviceName'];
            deviceTypeId = self.refs['deviceTypeId'];
            //deviceTypes = self.refs['deviceTypes'];
            location = self.refs['location'];
            orgId = self.refs['orgId'];
            memberId = self.refs['memberId'];
        }
        let freeCtrls = () => {
            memberId = null;
            orgId = null;
            location = null;
            //deviceTypes = null;
            deviceTypeId = null;
            deviceName = null;
        }
        let clearInputs = () => {
            memberId.clear();
            orgId.clear();
            location.clear();
            //deviceTypes.clear();
            deviceTypeId.clear();
            deviceName.clear();
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('devicetype:list:changed', onDeviceTypeListChanged);
            document.addEventListener('org:list:changed', onOrgListChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('org:list:changed', onOrgListChanged);
            document.removeEventListener('devicetype:list:changed', onDeviceTypeListChanged);
            document.removeEventListener('app:screen:changed', onScreenChanged);
            document.removeEventListener('language:changed', onLanguageChanged);
            document.removeEventListener('app:content:changed', onAppContentChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion

        //#region dom event handlers

        let onAppContentChanged = (e) => { updatecontent(); }
        let onLanguageChanged = (e) => { updatecontent(); }
        let onScreenChanged = (e) => { updatecontent(); }

        let onDeviceTypeListChanged = (e) => { updatecontent(); }
        let onOrgListChanged = (e) => {

        }

        //#endregion

        //#region public methods

        let origObj;
        let editObj;

        let clone = (src) => { return JSON.parse(JSON.stringify(src)); }
        let equals = (src, dst) => {
            let o1 = JSON.stringify(src);
            let o2 = JSON.stringify(dst);
            return (o1 === o2);
        }

        let ctrlToObj = () => {
            if (editObj) {
                console.log('ctrlToObj:', editObj)
                if (deviceName) editObj.DeviceName = deviceName.value();
                if (location) editObj.Location = location.value();
                //if (deviceTypeId) editObj.deviceTypeId = Number(deviceTypeId.value());
                if (deviceTypeId) editObj.deviceTypeId = deviceTypeId.value();
                if (orgId) editObj.orgId = orgId.value();
                if (memberId) editObj.memberId = memberId.value();
            }
        }
        let objToCtrl = () => {
            if (editObj) {
                //console.log('objToCtrl:', editObj)
                if (deviceName) deviceName.value(editObj.DeviceName);
                if (location) location.value(editObj.Location);
                //if (deviceTypeId) deviceTypeId.value(editObj.deviceTypeId.toString());
                if (deviceTypeId) deviceTypeId.value(editObj.deviceTypeId);
                if (orgId) orgId.value(editObj.orgId);
                if (memberId) memberId.value(editObj.memberId);
            }
        }

        this.setup = (item) => {  
            origObj = clone(item);
            editObj = clone(item);
            //console.log('device entry setup:', editObj)
            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();
            //console.log('getItem:', editObj)
            let hasId = (editObj.deviceId !== undefined && editObj.deviceId != null)
            let isDirty = !hasId || !equals(origObj, editObj);
            //console.log(editObj)
            return (isDirty) ? editObj : null;
        }

        //#endregion
    </script>
</device-entry>