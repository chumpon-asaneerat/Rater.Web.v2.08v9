<email-input>
    <input type="text" name="" required="">
    <label>{ opts.title }</label>
    <style>
        /* Change Autocomplete styles in Chrome*/
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
            font-family: sans-serif;
            font-size: 14px;
            transition: background-color 5000s ease-in-out 0s;
        }

        :scope {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
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
            border-bottom: 2px solid #999;
        }
        :scope label {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #999;
            transition: .5s;
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
    <script></script>
</email-input>
