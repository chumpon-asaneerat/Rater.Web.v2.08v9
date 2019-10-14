<device-view>
    <div ref="title" class="titlearea">
        <button class="addnew" onclick="{ addnew }">
            <span class="fas fa-plus-circle">&nbsp;</span>
        </button>
        <button class="refresh" onclick="{ refresh }">
            <span class="fas fa-sync">&nbsp;</span>
        </button>
    </div>
    <div ref="container" class="scrarea">
        <div ref="grid"></div>
        <!--
        <div ref="grid" id="griddevice"></div>
        -->
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 30px 1fr;
            grid-template-areas: 
                'titlearea'
                'scrarea';
        }
        :scope .titlearea {
            grid-area: titlearea;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 3px;
            background-color: transparent;
            color: whitesmoke;
        }
        :scope .titlearea .addnew {
            margin: 0 auto;
            padding: 2px;
            height: 100%;
            width: 50px;
            color: darkgreen;
        }
        :scope .titlearea .refresh {
            margin: 0 auto;
            padding: 2px;
            height: 100%;
            width: 50px;
            color: darkgreen;
        }
        :scope .scrarea {
            grid-area: scrarea;
            margin: 0 auto;
            padding: 0;
            margin-top: 3px;
            width: 100%;
            /* height: calc(100% - 50px); */
            height: 100%;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        let screenId = 'device';
        let entryId = 'device';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Device Management',
            label: {},
            links: []
        }
        this.content = defaultContent;
        
        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
                if (table) table.redraw(true);
            }
        }

        //#endregion

        //#region controls variables and methods

        let table;

        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let initGrid = (data) => {     
            let opts = {
                height: "100%",
                layout: "fitDataFill",
                data: (data) ? data : []
            }
            setupColumns(opts);
            //table = new Tabulator("#gridmember", opts);
            table = new Tabulator(self.refs['grid'], opts);
        }
        let setupColumns = (opts) => {
            let = columns = [
                { formatter: editIcon, align:"center", width:44, 
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: editRow
                },
                { formatter: deleteIcon, align:"center", width: 44, 
                    resizable: false, frozen: true, headerSort: false,
                    cellClick: deleteRow
                }
            ]
            if (self.content && self.content.label && 
                self.content.label.device && self.content.label.device.view) {
                let cols = self.content.label.device.view.columns;
                columns.push(...cols)
            }
            opts.columns = columns;
        }
        let syncData = () => {
            if (table) table = null;
            let data = devicemanager.device.current;
            initGrid(data)
        }

        let initCtrls = () => { initGrid(); }
        let freeCtrls = () => { table = null; }
        let clearInputs = () => { initGrid(); }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('entry:endedit', onEndEdit);
            document.addEventListener('device:list:changed', onDeviceListChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('device:list:changed', onDeviceListChanged);
            document.removeEventListener('entry:endedit', onEndEdit);
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

        let onAppContentChanged = (e) => { 
            updatecontent();
        }
        let onLanguageChanged = (e) => { 
            updatecontent();
            syncData();
        }
        let onScreenChanged = (e) => {
            updatecontent();
            if (e.detail.screenId === screenId) {
                //console.log('detected screen change')
                devicemanager.device.load();
            }
            else {
                // other screen shown.
            }
        }
        let onDeviceListChanged = (e) => { 
            syncData();
        }

        //#endregion

        //#region grid handler

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            evt = new CustomEvent('entry:beginedit', { detail: { entry: entryId, item: data } })
            document.dispatchEvent(evt);
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            console.log('delete:', data, ', langId:', lang.langId);
            syncData();
            /*
            evt = new CustomEvent('entry:delete', { detail: { entry: entryId, item: data } })
            document.dispatchEvent(evt);
            */
        }
        let onEndEdit = (e) => {
            syncData();        
            table.redraw(true);
        }

        //#endregion

        //#region private service wrapper methods

        let showMsg = (err) => { }

        //#endregion

        //#region public methods

        this.addnew = (e) => {
            let data = { 
                deviceId: null,
                memberId: null, 
                deviceName: null,
                location: null,
                deviceTypeId: null
            };
            evt = new CustomEvent('entry:beginedit', { detail: { entry: entryId, item: data } })
            document.dispatchEvent(evt);
        }
        this.refresh = (e) => { 
            devicemanager.device.load();
            updatecontent();
        }

        //#endregion
    </script>
</device-view>