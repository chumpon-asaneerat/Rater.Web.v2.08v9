<icon-button>    
    <style>
        :scope {
            display: inline-block;
            margin: 0 auto;
            padding: 5px;
            text-align: center;
            border-radius: 3px;
        }
        .wrap {
            display: block;
            margin: 0 auto;
            color: white;
        }
        .wrap:hover {
            color: red;
            cursor: pointer;
        }
        .wrap a {
            color: inherit;
            text-decoration: none;
        }
        .wrap a:hover {
            color: red;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
    <div class="wrap">
        <a href="{ opts.href }">
            <span class="{ opts.awesome }">&nbsp;</span>{ opts.text }
        </a>
    </div>
    
    <script>
        let self = this;
    </script>
</icon-button>