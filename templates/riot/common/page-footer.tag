<page-footer>
    <p class="caption">Status:</p>
    <p class="status" ref="l1"></p>
    <p class="copyright">&copy; EDL Co., Ltd. 2019</p>
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
            self.root.addEventListener('languagechanged', onLanguageChanged);
        }
        let unbindEvents = () => {
            self.root.removeEventListener('languagechanged', onLanguageChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region private methods

        let onLanguageChanged = (e) => { self.update(); }

        //#endregion
    </script>
</page-footer>
    