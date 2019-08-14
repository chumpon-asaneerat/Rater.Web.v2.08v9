<tag>
    <style>
        :scope {
            margin: 0 auto;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //console.log('opts:', this.opts)
        //console.log('refs:', this.refs)
        //console.log('tags (init):', this.tags)
        //console.log('Screens:', this.tags['screen']) // cannot access until mount.

        //#endregion

        //#region local element methods

        let bindEvents = () => { }
        let unbindEvents = () => { }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            bindEvents();
            //console.log('tags (after mount):', this.tags)
            //console.log('Screens:', this.tags['screen'])
        });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region public methods

        this.publicMethod = (message) => { }

        //#endregion
    </script>
</tag>