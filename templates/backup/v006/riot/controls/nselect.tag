<nselect>
    <select ref="input">
        <virtual if={ hasItems() }>
            <virtual each={ item in items }>
                <virtual if={ isvalid(item) }>
                    <option value="{ getValue(item) }">{ getText(item) }</option>
                </virtual>
            </virtual>
        </virtual>
    </select>
    <div ref="clear" class="clear">x</div>
    <label>{ opts.title }</label>
    <style>
        :scope {
            margin: 0;
            padding: 10px;
            font-size: 14px;
            display: inline-block;
            position: relative;
            height: auto;
            width: 100%;
            /* background: rgba(255, 255, 255, .2); */
            background: white;            
            /* border: 1px solid rgba(0, 0, 0, .1); */            
            box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2);
        }
        :scope select {
            display: inline-block;
            padding: 5px 0;
            margin-bottom: 5px;
            width: calc(100% - 25px);
            background-color: rgba(255, 255, 255, .2);
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            border: none;
            font-size: 14px;
            /* box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.2) inset; */
            box-shadow: 0 0 0px 1000px white inset;
            border-bottom: 2px solid #999;
        }
        :scope .clear {
            display: inline-block;
            margin: 0 auto;
            padding: 0px 5px;
            font-size: 14px;
            font-weight: bold;
            width: 20px;
            height: 20px;
            color: white;
            cursor: pointer;
            user-select: none;
            border: 1px solid red;
            border-radius: 50%;
            background: rgba(255, 100, 100, .75);
        }
        :scope .clear:hover {
            color: yellow;
            background: rgba(255, 0, 0, .8);
        }
        /* Change Autocomplete styles in Chrome*/
        :scope select:-webkit-autofill,
        :scope select:-webkit-autofill:hover, 
        :scope select:-webkit-autofill:focus {
            font-size: 14px;
            transition: background-color 5000s ease-in-out 0s;
        }
        :scope label {
            position: absolute;
            top: 15px;
            left: 14px;
            color: #999;
            transition: .2s;
            pointer-events: none;
        }
        :scope select:focus ~ label,
        :scope select:-webkit-autofill ~ label,
        :scope select:valid ~ label {
            top: -10px;
            left: 10px;
            color: #f7497d;
            font-weight: bold;
        }
        :scope select:focus,
        :scope select:valid {
            border-bottom: 2px solid #f7497d;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.items = [];
        this.valueMember = '';
        this.displayMember = '';

        this.hasItems = () => {
            console.log('has items')
            return this.items && this.items.length > 0;
        }
        let isEmpty = (key) => {
            return (key === undefined || key === null || key === '')
        }
        this.isvalid = (item) => {
            console.log('isvalid')
            if (!item) return false;
            console.log(item)
            console.log(this.valueMember)
            console.log(this.displayMember)
            console.log(this.valueMember in item)
            console.log(this.displayMember in item)
            let hasValProp = (!isEmpty(this.valueMember)) ? this.valueMember in item : false;
            let hasDispProp = (!isEmpty(this.displayMember)) ? this.displayMember in item : false;

            return hasValProp &&  hasDispProp;
        }
        this.getValue = (item) => {
            console.log('getvalue:', item)
            if (!item) return "0";
            return item[this.valueMember]
        }
        this.getText = (item) => {
            if (!item) return "";
            console.log('gettext:', item)
            return item[this.displayMember]
        }

        //#endregion

        //#region controls variables and methods

        let input, clear;

        let initCtrls = () => {
            input = self.refs['input'];
            clear = self.refs['clear'];
        }
        let freeCtrls = () => {
            flipper = null;
        }
        let clearInputs = () => {
            input = null;
            clear = null;
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            clearInputs();
        });

        //#endregion

        //#region dom event handlers

        let onClear = () => {
            if (input) input.value = '';
        }

        //#endregion

        //#region public methods

        this.setup = (items, valueMember, displayMember) => {
            console.log(items)
            self.items = items;
            self.valueMember = displayMember;
            self.displayMember = displayMember;
            self.update();
        }

        this.clear = () => {
            //if (input) input.value = '';
        }
        this.focus = () => { if (input) input.focus(); }

        /*
        this.value = (text) => {
            let ret;
            if (input) {
                if (text !== undefined && text !== null) {
                    input.value = text;
                }
                else {
                    ret = input.value;
                }
            }
            return ret;
        }
        */

        //#endregion
    </script>
</nselect>