<text-input>
    <div class="box">        
        <input type="text" name="" required="">
        <label>Name</label>
    </div>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
        }
        .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            background: #fff;
            padding: 40px;
            border: 1px solid rgba(0, 0, 0, .1);
            box-shadow: 0 5px 10px solid rgba(0, 0, 0, .2);
        }
        .box input {
            padding: 10px 0;
            margin-bottom: 30px;
        }

        .box input {
            width: 100%;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            border: none;
            border-bottom: 2px solid #999;

        }

        .box {
            position: relative;
        }
        .box label {
            position: absolute;
            top: 10px;
            left: 0;
            color: #999;
            transition: .5s;
            pointer-events: none;
        }
        .box input:focus ~ label,
        .box input:valid ~ label {
            top: -12px;
            left: 0;
            color: #f7497d;
            font-size: 12px;
            font-weight: bold;
        }
        .box input:focus,
        .box input:valid {
            border-bottom: 2px solid #f7497d;
        }
    </style>
    <script></script>
</text-input>
