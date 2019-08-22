<page-footer>
    <p class="caption">{ (content && content.current) ? content.current.footer.label.status : 'Status' }:</p>
    <p class="status" ref="l1"></p>
    <p class="copyright">&copy; { (content && content.current) ? content.current.footer.label.copyright : 'EDL Co., Ltd.' }</p>
    <style>
        :scope {
            width: 100vw;
            display: grid;
            grid-template-columns: 30px 1fr 120px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'caption status copyright';

            justify-items: stretch;
            align-items: stretch;

            font-size: 0.75em;
            font-weight: bold;
            background: darkorange;
            color: whitesmoke;
        }
        .caption {
            grid-area: caption;
            padding-left: 3px;
        }
        .status {
            grid-area: status;
        }
        .copyright {
            grid-area: copyright;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region local element methods

        let bindEvents = () => {
            self.root.addEventListener('languagechanged', onChanged);
            self.root.addEventListener('contentchanged', onChanged);
        }
        let unbindEvents = () => {
            self.root.removeEventListener('contentchanged', onChanged);
            self.root.removeEventListener('languagechanged', onChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        let onChanged = (e) => { self.update(); }

        //#endregion
    </script>
</page-footer>
    