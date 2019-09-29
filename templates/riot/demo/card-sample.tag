<card-sample>    
    <dual-screen ref="flipper">
        <yield to="viewer">
            <div ref="view" class="view">
                <!--
                <img src="public/assets/images/png/books/book1.png" style="width: 100%; height: auto;">
                -->                
                <div ref="grid" id="grid"></div>
            </div>                
        </yield>
        <yield to="entry">
            <div ref="entry" class="entry">
                <div class="head">
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                </div>
                <div class="input-ui">
                    <input type="text" value="" placeholder="enter some text">
                    <button ref="submit">Submit</button>
                </div>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>Architect & Engineer</p>
            </div>
        </yield>
    </dual-screen>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .view, .entry {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            max-width: 100vh;
            max-height: calc(100vh - 63px);
            overflow: auto;
        }
        .head {
            text-align: center;
        }
        .input-ui {
            margin: 0 auto;
            padding: 5px;
            width: auto;
        }
    </style>
    <script>
        let self = this;
        let flipper, view, submit, table;

        let bindEvents = () => {
            document.addEventListener('screenchanged', screenchanged);
            view.addEventListener('click', toggle);
            //entry.addEventListener('click', toggle);
            submit.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            submit.removeEventListener('click', toggle);
            //entry.removeEventListener('click', toggle);
            view.removeEventListener('click', toggle);
            document.removeEventListener('screenchanged', screenchanged);
        }

        let screenchanged = (e) => {
            if (e.detail.screenId === 'home') {
                table.redraw(true)
            }
        }

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
            table = new Tabulator("#grid", {
                height: "100%",
                layout:"fitDataFill",
                columns: [
                    { title: "Name", field: "name" },
                    //{ title: "Progress", field:"progress", sorter: "number" },
                    //{ title: "Gender", field: "gender" },
                    { title: "Age", field: "age" },
                    { title: "Favourite Color", field: "col" },
                    { title: "Date Of Birth", field: "dob", align: "center" }
                ],
                rowClick: (e, row) => {
                    console.log("Row " + row.getIndex() + " Clicked!!!!")
                    console.log('Selected data:', row.getData())
                }
            });  
            table.setData(tabledata)
        }

        this.on('mount', () => {
            flipper = self.refs['flipper'];
            // The view/entry is in yield scope cannot be access via self variable.
            view = flipper.refs['view'];
            //entry = flipper.refs['entry'];
            submit = flipper.refs['submit'];
            grid = flipper.refs['grid'];
            bindEvents();

            initGrid();
        });
        this.on('unmount', () => {
            unbindEvents();
            grid = null;
            submit = null;
            //entry = null;
            view = null;
            flipper = null;            
        });

        let toggle = () => {            
            flipper.toggle();
        }
    </script>
</card-sample>