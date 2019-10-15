<report-menu>
    <div class="report-main-menu">
        <button onclick="{ showRawVoterSearch }">Raw Vote Search</button>
        <button>Vote Summary Search</button>
        <button>Staff Performance Search</button>
        <button>Vote Summary Search</button>
        <button>Staff Performance Search</button>
        <button>Vote Summary Search</button>
        <button>Staff Performance Search</button>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        :scope .report-main-menu {
            margin: 0 auto;
            margin-top: 100px;
            padding: 0;
            width: 80%;
            /* height: 100%; */
            display: grid;
            grid-template-columns: repeat(4, minmax(200px, 1fr));
            grid-template-rows: repeat(4, 70px);
            grid-gap: 0.5em;
            justify-content: center;
            align-items: stretch;
        }
    </style>
    <script>
        let self = this;
        let main;

        this.showRawVoterSearch = () => {
            if (main) {
                main.showRawVoterSearch();
            }
        }

        this.setup = (mainmenu) => {
            main = mainmenu;
        }

        this.refresh = () => {
            
        }
    </script>
</report-menu>