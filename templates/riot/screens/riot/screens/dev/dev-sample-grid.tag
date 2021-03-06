<dev-sample-grid>
    <div ref="grid" id="grid"></div>
    <style>
        :scope {
            display: block;
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .item {
            display: inline-block;
            color: dimgray;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region content variables and methods

        let updatecontent = () => {
            /*
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                self.update();
            }
            */
            self.update();
        }

        //#endregion

        //#region controls variables and methods

        let initCtrls = () => {
            initGrid();
        }
        let freeCtrls = () => { }
        let clearInputs = () => { }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:content:changed', onAppContentChanged);
            document.addEventListener('language:changed', onLanguageChanged);
            document.addEventListener('app:screen:changed', onScreenChanged);
            document.addEventListener('sample:endedit', onEndEdit);
        }
        let unbindEvents = () => {
            document.removeEventListener('sample:endedit', onEndEdit);
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
            table.redraw(true);
        }
        let onLanguageChanged = (e) => {
            if (lang.current.langId === 'TH') {
                //table.replaceData(tabledata2);
                table.clearData();
                table.setData(tabledata2);
                table.redraw(true);
            }
            else {
                //table.replaceData(tabledata);
                table.clearData();
                table.setData(tabledata);
                table.redraw(true);
            }
            updatecontent();
        }
        let onScreenChanged = (e) => {
            updatecontent();
            table.redraw(true);
            if (e.detail.screenId === screenId) {
            }
            else {
            }
        }

        //#endregion
        
        let editIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-edit'></span></button>";
        };
        let deleteIcon = (cell, formatterParams) => {
            return "<button><span class='fas fa-trash-alt'></span></button>";
        };

        let tabledata = [
            {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
            {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
        ];
        let tabledata2 = [
            {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
            {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
            {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
            {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
            {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:1, name:"JJJJ", age:"12", col:"red", dob:""},
            {id:2, name:"DDDD", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"XXXX", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"YYYY", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:5, name:"LLLL", age:"16", col:"yellow", dob:"31/01/1999"}
        ];

        let editRow = (e, cell) => {
            let data = cell.getRow().getData();
            evt = new CustomEvent('sample:beginedit', { detail: { item: data } })
            document.dispatchEvent(evt);
        }
        let deleteRow = (e, cell) => {
            let data = cell.getRow().getData();
            evt = new CustomEvent('sample:delete', { detail: { item: data } })
            document.dispatchEvent(evt);
        }
        let onEndEdit = (e) => {
            let data = e.detail.item;
            //table.replaceData(data);
            table.redraw(true);
        }

        let initGrid = () => {
            let opts = {
                height: "100%",
                layout: "fitDataFill",
                //layout:"fitData",
                //layout:"fitDataFill",
                //layout:"fitColumns",
                columns: [
                    { formatter: editIcon, align:"center", width:44, 
                      resizable: false, frozen: true, headerSort: false,
                      cellClick: editRow
                    },
                    { formatter: deleteIcon, align:"center", width: 44, 
                      resizable: false, frozen: true, headerSort: false,
                      cellClick: deleteRow
                    },
                    // rownum cannot be sort. required to append all data in array
                    // and bind as normal column.
                    //{ formatter: "rownum", align:"center", width: 40, frozen: true },
                    { title: "Name", field: "name", resizable: false },
                    { title: "Age", field: "age", resizable: false },
                    { title: "Favourite Color", field: "col", resizable: false },
                    { title: "Date Of Birth", field: "dob", align: "center", resizable: false },
                    { title: "Progress", field:"progress", sorter: "number", resizable: false },
                    { title: "Gender", field: "gender", resizable: false },
                    { title: "Col A", field: "a", resizable: false },
                    { title: "Col B", field: "b", resizable: false },
                    { title: "Col C", field: "c", resizable: false },
                    { title: "Col D", field: "d", resizable: false },
                    { title: "Col E", field: "e", resizable: false },
                    { title: "Col F", field: "f", resizable: false },
                    { title: "Col End", field: "end", resizable: false}
                ]/*,
                rowClick: (e, row) => {
                    console.log("Row " + row.getIndex() + " Clicked!!!!")
                    console.log('Selected data:', row.getData())
                }*/
            }

            table = new Tabulator("#grid", opts);
            initData(tabledata)
        }

        let initData = (data) => {
            table.setData(data)
        }
    </script>
</dev-sample-grid>