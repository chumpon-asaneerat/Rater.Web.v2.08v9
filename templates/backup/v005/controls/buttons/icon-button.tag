<icon-button>    
    <a href="{ opts.href }">
        <span class="{ opts.awesome }">&nbsp;</span>{ opts.text }
    </a>
    <style>
        :scope {
            display: inline-block;
            margin: 0 auto;
            padding: 5px;
            text-align: center;
            border-radius: 3px;
            color: white;
        }
        :scope:hover {
            color: red;
            cursor: pointer;
        }
        :scope a {
            color: inherit;
            text-decoration: none;
        }
        :scope a:hover {
            color: red;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
    <script>
        let self = this;
    </script>
</icon-button>