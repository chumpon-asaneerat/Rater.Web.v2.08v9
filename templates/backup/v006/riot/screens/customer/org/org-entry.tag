<org-entry>
    <div class="padtop"></div>
    <div class="padtop"></div>
    <ninput ref="orgName" title="{ content.label.org.entry.orgName }" type="text" name="orgName"></ninput>
    <ninput ref="parentId" title="{ content.label.org.entry.parentId }" type="text" name="parentId"></ninput>
    <ninput ref="branchId" title="{ content.label.org.entry.branchId }" type="text" name="branchId"></ninput>
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
        let screenId = 'org';
        let entryId = 'org';

        //#region content variables and methods
        
        let defaultContent = {
            label: {
                org: {
                    entry: { 
                        orgName: 'Org Name',
                        parentId: 'Parent Org',
                        branchId: 'Branch'
                    }
                }
            }
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
        }

        //#endregion

        //#region controls variables and methods

        let orgName, parentId, branchId;

        let initCtrls = () => {
            orgName = self.refs['orgName'];
            parentId = self.refs['parentId'];
            branchId = self.refs['branchId'];
        }
        let freeCtrls = () => {
            orgName = null;
            parentId = null;
            branchId = null;
        }
        let clearInputs = () => {
            orgName.clear()
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
        }
        let unbindEvents = () => {
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
                if (orgName) {
                    editObj.OrgName = orgName.value();
                    editObj.parentId = parentId.value();
                    editObj.branchId = branchId.value();
                }
            }
        }
        let objToCtrl = () => {
            if (editObj) {
                if (orgName) {
                    orgName.value(editObj.OrgName);
                    parentId.value(editObj.parentId);
                    branchId.value(editObj.branchId);
                }
            }
        }

        this.setup = (item) => {  
            origObj = clone(item);
            editObj = clone(item);
            console.log('org entry setup:', editObj)
            objToCtrl();
        }
        this.getItem = () => {
            ctrlToObj();
            let hasId = (editObj.orgId !== undefined && editObj.orgId != null)
            let isDirty = !hasId || !equals(origObj, editObj);
            //console.log(editObj)
            return (isDirty) ? editObj : null;
        }

        //#endregion
    </script>
</org-entry>