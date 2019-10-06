<dev-grid>
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
        let screenId = 'home';

        //#endregion

        //#region content variables and methods

        let defaultContent = {
            title: 'Dev Grid',
            label: {}
        }
        this.content = defaultContent;

        let updatecontent = () => {
            if (screenservice && screenservice.screenId === screenId) {
                self.content = (screenservice.content) ? screenservice.content : defaultContent;
                if (table) table.redraw(true);
                self.update();
            }
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
            document.addEventListener('appcontentchanged', onAppContentChanged);
            document.addEventListener('languagechanged', onLanguageChanged);
            document.addEventListener('screenchanged', onScreenChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('screenchanged', onScreenChanged);
            document.removeEventListener('languagechanged', onLanguageChanged);
            document.removeEventListener('appcontentchanged', onAppContentChanged);
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
        let onScreenChanged = (e) => {
            updatecontent();
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
        let initGrid = () => {
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

            let opts = {
                height: "100%",
                layout:"fitData",
                //layout:"fitDataFill",
                //layout:"fitColumns",
                columns: [
                    { formatter: editIcon, align:"center", width:44, 
                      frozen: true, headerSort: false,
                      cellClick: (e, cell) => {
                          console.log("Edit Row : " + cell.getRow().getData().name)
                      }
                    },
                    { formatter: deleteIcon, align:"center", width: 44, 
                      frozen: true, headerSort: false,
                      cellClick: (e, cell) => {
                          console.log("Delete Row : " + cell.getRow().getData().name)
                      }
                    },
                    // rownum cannot be sort. required to append all data in array
                    // and bind as normal column.
                    //{ formatter: "rownum", align:"center", width: 40, frozen: true },
                    { title: "Name", field: "name" },
                    { title: "Age", field: "age" },
                    { title: "Favourite Color", field: "col" },
                    { title: "Date Of Birth", field: "dob", align: "center" },
                    { title: "Progress", field:"progress", sorter: "number" },
                    { title: "Gender", field: "gender" },
                    { title: "Col A", field: "a" },
                    { title: "Col B", field: "b" },
                    { title: "Col C", field: "c" },
                    { title: "Col D", field: "d" },
                    { title: "Col E", field: "e" },
                    { title: "Col F", field: "f" },
                    { title: "Col End", field: "end"}
                ]/*,
                rowClick: (e, row) => {
                    console.log("Row " + row.getIndex() + " Clicked!!!!")
                    console.log('Selected data:', row.getData())
                }*/
            }

            table = new Tabulator("#grid", opts);
            table.setData(tabledata)
        }
    </script>
</dev-grid>