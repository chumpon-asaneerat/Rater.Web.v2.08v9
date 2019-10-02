<ninput>
    <input type={ opts.type } name={ opts.name } required="">
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
        :scope .padtop {
            width: 100%;
            height: 0px;
        }
        :scope input {
            padding: 5px 0;
            margin-bottom: 5px;
            width: 100%;
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
</ninput>