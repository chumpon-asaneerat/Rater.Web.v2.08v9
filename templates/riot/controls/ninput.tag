<ninput>
    <input type={ opts.type } name={ opts.name } required="">
    <label>{ opts.title }</label>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            font-size: 14px;
            display: inline-block;
            position: relative;
            height: auto;
            width: 100%;
            background: #fff;
            padding: 10px;
            /* border: 1px solid rgba(0, 0, 0, .1); */            
            box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2);
        }
        :scope input {
            padding: 5px 0;
            margin-bottom: 5px;
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            border: none;
            font-size: 14px;
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
            top: -5px;
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