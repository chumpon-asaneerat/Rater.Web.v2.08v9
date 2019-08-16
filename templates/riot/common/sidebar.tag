<sidebar>
    <h3>Tutorial 1</h3>
    <p>
    Context
    A new context is created for each item. These are tag instances.
    When loops are nested, all the children tags in the loop inherit any of their parent 
    loop’s properties and methods they themselves have undefined. In this way, Riot avoids 
    overriding things that should not be overridden by the parent tag.
    A new context is created for each item. These are tag instances.
    When loops are nested, all the children tags in the loop inherit any of their parent 
    loop’s properties and methods they themselves have undefined. In this way, Riot avoids 
    overriding things that should not be overridden by the parent tag.
    A new context is created for each item. These are tag instances.
    When loops are nested, all the children tags in the loop inherit any of their parent 
    loop’s properties and methods they themselves have undefined. In this way, Riot avoids 
    overriding things that should not be overridden by the parent tag.
    </p>
    <style>
        :scope {
            margin: 0 auto;
            background: silver;
            position: fixed;
            left: -100vw;
            top: 40px;
            width: 100vw;
            height: calc(100vh - 40px - 20px);
            background-color: rgba(90, 90, 90, .9);
            display: block;
            transition: left 0.3s ease;
            overflow: auto;
            display: block;
        }
        :scope.open {
            left: 0;
            display: block;
        }
    </style>
    <script>
        //#region local variables

        let self = this;
        this.app = null;

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        //#endregion

        //#region public methods

        //#endregion
    </script>
</sidebar>