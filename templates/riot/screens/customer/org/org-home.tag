<org-home>
    <div class="tab">
        <button ref="tabheader" class="tablinks active" name="org" onclick="{ showContent }">Org</button>
        <button ref="tabheader" class="tablinks" name="branch" onclick="{ showContent }">Branch</button>
    </div>
    <!-- Tab content -->
    <div ref="tabcontent" name="org" class="tabcontent" style="display: block;">
        <org-manage></org-manage>
    </div>
    <div ref="tabcontent" name="branch" class="tabcontent">
        <branch-manage></branch-manage>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }
        /* Style the buttons that are used to open the tab content */
        :scope .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
        }
        /* Change background color of buttons on hover */
        :scope .tab button:hover {
            background-color: #ddd;
        }
        /* Create an active/current tablink class */
        :scope .tab button.active { background-color: #ccc; }
        /* Style the tab content */
        :scope .tabcontent {
            display: none;
            padding: 2px;
            /* border: 1px solid #ccc; */
            border-top: none;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
        }
    </style>
    <script>
        let self = this;
        let screenid = 'org';

        //#region controls variables and methods

        let tabHeaders = [];
        let tabContents = [];

        let initCtrls = () => {
            let headers = self.refs['tabheader'];
            tabHeaders.push(...headers)
            let contents = self.refs['tabcontent'];
            tabContents.push(...contents)
        }
        let freeCtrls = () => {
            tabHeaders = [];
            tabContents = [];
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => { }
        let unbindEvents = () => { }

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

        let clearActiveTabs = () => {
            if (tabHeaders) {
                // Get all elements with class="tabcontent" and hide them
                for (let i = 0; i < tabHeaders.length; i++) {
                    tabHeaders[i].className = tabHeaders[i].className.replace(" active", "");
                }
            }
        }
        let hideContents = () => {
            if (tabContents) {
                // Get all elements with class="tabcontent" and hide them
                for (let i = 0; i < tabContents.length; i++) {
                    tabContents[i].style.display = "none";                    
                }
            }
        }        
        let getContent = (name) => {
            let ret;
            if (tabContents) {
                for (let i = 0; i < tabContents.length; i++) {
                    let attr = tabContents[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabContents[i];
                        break;
                    }
                }
            }
            return ret;
        }
        let getHeader = (name) => {
            let ret;
            if (tabHeaders) {
                for (let i = 0; i < tabHeaders.length; i++) {
                    let attr = tabHeaders[i].attributes['name'];
                    let aName = attr.value;
                    let vName = name;
                    if (aName === vName) {
                        ret = tabHeaders[i];
                        break;
                    }
                }
            }
            return ret;
        }

        this.showContent = (evt) => {
            let target = evt.target;
            let name = target.attributes['name'].value;
            if (name === 'branch') {
                orgmanager.branch.load();
            }
            else if (name === 'org') {
                orgmanager.org.load();
            }
            hideContents();
            clearActiveTabs();
            // Show the current tab, and add an "active" class to the button that opened the tab
            let currHeader = getHeader(name);
            let currContent = getContent(name);
            if (currContent) {
                currContent.style.display = "block";
            }
            if (currHeader) {
                currHeader.className += " active";
            }
        }
    </script>
</org-home>