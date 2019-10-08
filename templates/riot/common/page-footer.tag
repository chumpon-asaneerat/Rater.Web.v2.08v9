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
            margin: 0 auto;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: fit-content(50px) 1fr fit-content(150px);
            grid-template-rows: 1fr;
            grid-template-areas: 
                'caption status copyright';

            font-size: 0.7em;
            font-weight: bold;
            background: darkorange;
            color: whitesmoke;
        }
        .caption {
            grid-area: caption;
            margin: 0 auto;
            padding-top: 2px;
            padding-left: 3px;
            user-select: none;
        }
        .status {
            grid-area: status;
            margin: 0 auto;
            padding-top: 2px;
            user-select: none;
        }
        .copyright {
            grid-area: copyright;
            margin: 0 auto;
            padding-top: 2px;
            user-select: none;
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('language:content:changed', onLanguageChanged);
        }
        let unbindEvents = () => {
            document.removeEventListener('language:content:changed', onLanguageChanged);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => { bindEvents(); });
        this.on('unmount', () => { unbindEvents(); });

        //#endregion

        //#region dom event handlers

        let onLanguageChanged = (e) => { self.update(); }

        //#endregion
    </script>
</page-footer>
    