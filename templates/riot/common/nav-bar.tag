<nav-bar>
    <div class="scrmenu">MAIN</div>
    <div class="banner">
        <div>app name</div>
    </div>
    <div class="langmenu">EN</div>
    <div class="navmenu">
        <a href="#">
            <span ref="showlinks" class="burger fas fa-bars" active="true"></span>
        </a>
        <a href="#">
            <span ref="hidelinks" class="burger fas fa-times"></span>
        </a>
    </div>
    <yield />
    <style>
        :scope {            
            width: 100vw;
            margin: 0 auto;
            padding: 0;
            display: grid;
            grid-template-columns: 25px 1fr 50px 30px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'scrmenu banner langmenu navmenu';

            background: cornflowerblue;
            color: whitesmoke;
        }
        p {
            display: inline;
            padding: 2px;
        }
        .scrmenu {
            grid-area: scrmenu;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        .banner {
            grid-area: banner;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        .langmenu {
            grid-area: langmenu;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        .navmenu {
            grid-area: navmenu;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        .navmenu a {
            color: whitesmoke;
        }
        .navmenu a:hover {
            color: yellow;
        };
        .navmenu span.burger {
            display: none;
        }
        .navmenu span[active='true'].burger {
            display: inline-block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region public methods

        //this.publicMethod = (message) => { }

        //#endregion
    </script>
</nav-bar>
