<raw-vote-search class="h-100">
    <div class="container h-100 pt-2">
        <form>
            <br>
            <div class="form-row">
                <div class="form-group">
                    <label>Question Set:</label>
                    <br>
                    <input type="text" id="qs1" class="form-control easyui-combobox" style="width:400px">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Begin Date:</label>
                    <br>
                    <input type="text" class="form-control easyui-datebox" id="beginDT1" style="width:200px">
                </div>
                <label>&nbsp;&nbsp;</label>
                <div class="form-group">
                    <label>End Date:</label>
                    <br>
                    <input type="text" class="form-control easyui-datebox" id="endDT1" style="width:200px">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Orgs:</label>
                    <br>
                    <div class="form-control easyui-panel" style="height:150px; padding:5px; width:400px">
                        <ul id="org1" class="easyui-tree"></ul>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <button type="button" onclick="{ home }">Home</button>
                </div>
                <label>&nbsp;&nbsp;</label>
                <div class="form-group">
                    <button type="button" onclick="{ search }">Search</button>
                </div>
                <label>&nbsp;&nbsp;</label>
                <div class="form-group">
                    <button type="button" onclick="{ clear }">Clear</button>
                </div>
            </div>
        </form>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 80%;
        }
    </style>
    <script>
        let self = this;
        let main;
        let criteria = {}

        let myformatter = (date) => {
            var y = date.getFullYear();
            var m = date.getMonth()+1;
            var d = date.getDate();
            //return (d<10?('0'+d):d) + '.' + (m<10?('0'+m):m) + '.' + y;
            return y + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d);
        }
        let myparser = (s) => {
            if (!s) return new Date();
            var ss = (s.split('-'));
            var y = parseInt(ss[0], 10);
            var m = parseInt(ss[1], 10);
            var d = parseInt(ss[2], 10);
            if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                return new Date(y, m-1, d);
            } else {
                return new Date();
            }
        }

        this.home = () => {
            //console.log('home click')
            //console.log(main)
            if (main) {
                main.showHome();
            }
        }

        this.search = () => { 
            criteria.beginDate = $('#beginDT1').datebox('getValue');
            criteria.endDate = $('#endDT1').datebox('getValue');
            criteria.orgs = []

            let nodes = $('#org1').tree('getChecked');
            for (let i = 0; i < nodes.length; i++) {
                criteria.orgs.push(nodes[i].id)
            }
            console.log(criteria)
        }
        this.clear = () => { }

        this.setup = (mainmenu) => {
            //console.log('setup called.')
            main = mainmenu;
        }

        this.refresh = () => {
            let qsets = [
                { qSetId: 'QS00001', QSetDescription: 'General Questions' }
            ]
            $('#qs1').combobox({
                valueField:'qSetId',
                textField:'QSetDescription',
                data: qsets,
                onSelect: (rec) => { 
                    //console.log(rec)
                    criteria.qSetId = rec.qSetId;
                }
            });
            $('#beginDT1').datetimebox({
                value: '',
                required: true,
                formatter: myformatter,
                parser: myparser
            });
            $('#endDT1').datetimebox({
                value: '',
                required: true,
                formatter: myformatter,
                parser: myparser
            });
            let orgs = [
                { id: 'O0001', text: 'EDL Co., Ltd.', 
                  children: [
                    { id: 'O0002', text: 'Office',  
                      children: [] },
                    { id: 'O0003', text: 'PCB Design',  
                      children: [] },
                    { id: 'O0004', text: 'R&D', 
                      children: [] },
                  ] }
            ]
            $('#org1').tree({
                checkbox: true,
                data: orgs
            })
        }
    </script>
</raw-vote-search>