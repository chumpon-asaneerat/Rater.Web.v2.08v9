<page-footer>
    <p>footer</p>
    <p ref="l1"></p>
    <script>
        let self = this;

        this.callme = (message) => {
            let el = self.refs['l1'];
            el.textContent = message;
            console.log('page-footer callme is reveived messagfe :', '"' + message + '"')
        }

        // riot handlers.
        this.on('mount', () => {
            console.log('root:', this.root)
        });
        this.on('unmount', () => {
        });
    </script>
</page-footer>