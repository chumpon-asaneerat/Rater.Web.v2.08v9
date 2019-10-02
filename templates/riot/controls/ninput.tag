<ninput>
    <input ref="input" type={ opts.type } name={ opts.name } required="">
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
        :scope input {
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
        :scope input:-webkit-autofill,
        :scope input:-webkit-autofill:hover, 
        :scope input:-webkit-autofill:focus {
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
        :scope input:focus ~ label,
        :scope input:-webkit-autofill ~ label,
        :scope input:valid ~ label {
            top: -10px;
            left: 10px;
            color: #f7497d;
            font-weight: bold;
        }
        :scope input:focus,
        :scope input:valid {
            border-bottom: 2px solid #f7497d;
        }
    </style>
    <script>
        let self = this;
        let input, clear;

        let bindEvents = () => {
            clear.addEventListener('click', onClear);
        }
        let unbindEvents = () => {
            clear.removeEventListener('click', onClear);
        }
        this.on('mount', () => {
            input = self.refs['input'];
            clear = self.refs['clear'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            input = null;
            clear = null;
        });

        let onClear = () => {
            if (input) input.value = '';
        }
        this.clear = () => {
            if (input) input.value = '';
        }
        this.focus = () => {
            if (input) input.focus();
        }
        this.value = (val) => {
            let ret;
            if (input) {
                if (!val) {
                    ret = input.value;
                }
                else {
                    input.value = val;
                }
            }
            return ret;
        }
    </script>
</ninput>