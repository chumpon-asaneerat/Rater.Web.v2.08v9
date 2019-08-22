<page-footer>
    <p class="caption">
        { (appcontent.current) ? appcontent.current.footer.label.status + ' : ' : 'Status : ' }
    </p>
    <p class="status" ref="l1"></p>
    <p class="copyright">
        &nbsp;&copy; 
        { (appcontent.current) ? appcontent.current.footer.label.copyright : 'EDL Co., Ltd.' }
        &nbsp;&nbsp;
    </p>
    <style>
        :scope {
            width: 100vw;
            display: grid;
            grid-template-columns: fit-content(50px) 1fr fit-content(150px);
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
            document.addEventListener('languagechanged', onLanguageChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('languagechanged', onLanguageChanged);
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
    