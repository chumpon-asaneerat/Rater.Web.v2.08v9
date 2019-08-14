<page-footer>
    <p>footer</p>
    <p ref="l1"></p>
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

        this.callme = (message) => {
            let el = self.refs['l1'];
            el.textContent = message;
            console.log('page-footer callme is reveived messagfe :', '"' + message + '"')
        }

        //#endregion
    </script>
</page-footer>